import argon2 from "argon2";

export const hashPassword = async (password) => {
  try {
    const hash = await argon2.hash(password, { type: argon2.argon2id });
    return hash;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const verifyPassword = async (password, hash) => {
  try {
    const isValid = await argon2.verify(hash, password);
    return isValid;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
