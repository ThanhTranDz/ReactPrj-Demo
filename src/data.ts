import { faker } from "@faker-js/faker";

type SubscriptionTier = "free" | "basic" | "business" | "design" | "tester";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  birthday: string;
  sex: string;
  jobArea: string;
  phone: string;
  subscriptionTier: SubscriptionTier;
  avatar: string;
}

const subscriptionTiers: SubscriptionTier[] = ["free", "basic", "business", "design", "tester"];

export const generateUsers = (count: number = 100): User[] => {
  return Array.from({ length: count }, (_, id) => ({
    id: id + 1,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int({ min: 18, max: 60 }),
    address: faker.location.streetAddress(),
    birthday: faker.date.birthdate().toLocaleDateString("en-GB"), // DD/MM/YYYY
    sex: faker.person.sex(),
    jobArea: faker.person.jobArea(),
    phone: faker.phone.number(),
    subscriptionTier: faker.helpers.arrayElement(subscriptionTiers) as SubscriptionTier,
    avatar: faker.image.avatar(),
  }));
};

export const users: User[] = generateUsers(100); 