package hr.algebra.mapper;

import hr.algebra.dto.SignInUser;
import hr.algebra.model.User;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
public interface UserSignInUserMapper {

    User to(SignInUser source);

    SignInUser from(User destination);
}
