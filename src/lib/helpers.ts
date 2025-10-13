import Cookies from "js-cookie";
import dayjs from "dayjs";
import { authKey } from "./constants";

export class helpers {
  // ===== Cookies =====
  static setAuthCookie(key: string, value: string): void {
    Cookies.set(key, value);
  }

  static getAuthCookie(key: string): string | undefined {
    return Cookies.get(key);
  }

  static removeAuthCookie(key: string): void {
    Cookies.remove(key);
  }

  static hasAuthToken(): string | undefined {
    return Cookies.get(authKey);
  }

  // ===== Dates =====
  static formatDate(date: string | Date, type = "DD MMM YYYY"): string {
    return dayjs(date).format(type);
  }

  static formatTime(date: string | Date): string {
    return dayjs(date).format("h:s A");
  }

  static formatDateTime(date: string | Date): string {
    return dayjs(date).format("h:s A - DD MMM YYYY");
  }
  //  ===== localStorage  =====
  static getStorageItem = (key: string) => {
    return localStorage.getItem(key);
  };
  static setStorageItem = (key: string, value: string | any) => {
    return localStorage.setItem(key, value);
  };
  static removeStorageItem = (key: string) => {
    return localStorage.removeItem(key);
  };

  // ===== Strings =====
  static capitalize(text: string): string {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  static lowerCase(text: string): string {
    return text ? text.toLowerCase() : "";
  }

  static upperCase(text: string): string {
    return text ? text.toUpperCase() : "";
  }
  // ========= from data =============
  static fromData(values: Record<string, any>): FormData {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      const value = values[key];
      if (value instanceof File) {
        formData.append(key, value);
      } else if (typeof value === "object" && value !== null) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });
    return formData;
  }

  // ========= imgSource =============
  static imgSource(href: string): string {
    if (href?.startsWith("http") || href?.startsWith("https")) return href;
    return href ? `${process.env.NEXT_PUBLIC_IMG_URL}${href}` : "";
  }
  // ========= song ===============
  static songMinutes(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }
}
