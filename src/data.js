import { faker } from "@faker-js/faker";

const subscriptionTiers = ["free", "basic", "business", "design", "tester"];

export const generateUsers = (count = 100) => {
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
    subscriptionTier: faker.helpers.arrayElement(subscriptionTiers),
    avatar: faker.image.avatar(),
  }));
};

export const users = generateUsers(100);
