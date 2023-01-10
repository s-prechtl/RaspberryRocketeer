import {CustomValidator} from "express-validator";
import {UserRepository} from "./repositories/UserRepository.js";
import {UserPgPromiseRepository} from "./repositories/pgPromise/UserPgPromiseRepository.js";

export const USERNAME_VALIDATION_REGEX: string = '[a-zA-Z0-9_.\\- ]*';
export const TIME_VALIDATION_REGEX: string = '([0-5]\\d:)?[0-5]\\d:[0-5]\\d';

/**
 * Custom express-validator to ensure that the user with given ID exists
 * @param userId
 */
export const userWithIdExists: CustomValidator = userId => {
    try {
        const userRepo: UserRepository = new UserPgPromiseRepository;
        return userRepo.withIdExists(userId).then(exists => {
            if (!exists) return Promise.reject("User does not exist");
        });
    } catch (error) {
        console.log(error);
    }
}

/**
 * Custom express-validator to ensure that the user with given name does not exist yet
 * @param username
 */
export const userWithNameDoesNotExists: CustomValidator = username => {
    try {
        const userRepo: UserRepository = new UserPgPromiseRepository;
        return userRepo.withNameExists(username).then(exists => {
            if (exists) return Promise.reject("User with given name already exists");
        });
    } catch (error) {
        console.log(error);
    }
}