package hr.algebra.service;

import hr.algebra.model.User;
import hr.algebra.model.UserPackage;

import java.util.List;

public interface UserPackageService {

    User signIn(UserPackage userPackage);

    boolean updatePackage(UserPackage userPackage);

    List<UserPackage> getAllUsers();

}
