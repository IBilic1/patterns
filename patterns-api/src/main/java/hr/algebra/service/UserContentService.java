package hr.algebra.service;

import hr.algebra.model.UserConsumption;
import hr.algebra.model.UserContent;

import java.util.List;

public interface UserContentService {

    List<UserContent> getAllUsersContents();

    List<UserContent> getUserContents(Long idUser);

    UserContent addUsersContent(UserContent userContent);

    List<UserConsumption> getConsumptions();

}
