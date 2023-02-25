package hr.algebra.service;

import hr.algebra.model.User;
import hr.algebra.model.UserPackage;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    User login(String email, String password);
}
