import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import { db } from './db';
import { users } from '@shared/schema';
import { eq } from 'drizzle-orm';
import express from 'express';

interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface LoginData {
  email: string;
  password: string;
}

export class PasswordAuthService {
  private saltRounds = 12;

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async signup(signupData: SignupData) {
    const { email, password, firstName, lastName } = signupData;

    // Check if user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const passwordHash = await this.hashPassword(password);
    
    // Generate user ID and verification token
    const userId = nanoid();
    const emailVerificationToken = nanoid(32);

    // Create user
    const [newUser] = await db
      .insert(users)
      .values({
        id: userId,
        email,
        firstName,
        lastName,
        passwordHash,
        emailVerified: false,
        emailVerificationToken,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return {
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      emailVerified: newUser.emailVerified,
    };
  }

  async login(loginData: LoginData) {
    const { email, password } = loginData;

    // Find user by email
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user || !user.passwordHash) {
      throw new Error('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await this.verifyPassword(password, user.passwordHash);
    
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Update last login
    await db
      .update(users)
      .set({ lastLoginAt: new Date() })
      .where(eq(users.id, user.id));

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      emailVerified: user.emailVerified,
      isAdmin: user.isAdmin,
      role: user.role,
      balance: user.balance,
    };
  }

  async getUserById(id: string) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    return user;
  }
}

export const passwordAuthService = new PasswordAuthService();