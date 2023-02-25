package hr.algebra.service.impl;

import hr.algebra.model.UserConsumption;
import hr.algebra.model.UserContent;
import hr.algebra.model.UserPackage;
import hr.algebra.repository.UserConsumptionRepository;
import hr.algebra.repository.UserContentRepository;
import hr.algebra.repository.UserPackageRepository;
import hr.algebra.repository.UserRepository;
import hr.algebra.service.UserContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class UserContentServiceImpl implements UserContentService {

    private final UserContentRepository userContentRepository;

    private final UserPackageRepository userPackageRepository;

    private final UserConsumptionRepository userConsumptionRepository;

    private final UserRepository userRepository;

    @Autowired
    public UserContentServiceImpl(UserContentRepository userContentRepository, UserRepository userRepository, UserPackageRepository userPackageRepository, UserConsumptionRepository userConsumptionRepository) {
        this.userContentRepository = userContentRepository;
        this.userRepository = userRepository;
        this.userPackageRepository = userPackageRepository;
        this.userConsumptionRepository = userConsumptionRepository;
    }

    @Override
    public List<UserContent> getAllUsersContents() {
        return userContentRepository.findAll();
    }

    @Override
    public List<UserContent> getUserContents(Long idUser) {
        Stream<UserContent> userContentStream = getAllUsersContents().stream().filter((userContent -> userContent.getUser().getId().equals(idUser)));
        return userContentStream.collect(Collectors.toList());
    }

    @Override
    public UserContent addUsersContent(UserContent userContent) {
        List<UserPackage> lastOfPackages = userPackageRepository.findLast(userContent.getUser().getId());
        if (lastOfPackages.size() > 0) {
            UserPackage userPackage = lastOfPackages.get(0);
            List<UserConsumption> byUserAndPackage = userConsumptionRepository.findByDateTime(userContent.getUser().getId(), userContent.getContent().getDateTime().minusDays(1), userContent.getContent().getDateTime());

            if (byUserAndPackage.size() > 0) {
                UserConsumption userConsumption = byUserAndPackage.get(0);
                int dailyUploadLimit = userConsumption.getDailyUploadLimit() + 1;
                double dailyUploadSize = userConsumption.getUploadSize() + userContent.getContent().getSize();

                if (dailyUploadSize < userPackage.getPackage_().getUploadSize() &&
                        dailyUploadLimit < userPackage.getPackage_().getDailyUploadLimit()) {
                    userContent.setUser(userRepository.findById(userContent.getUser().getId()).orElse(userContent.getUser()));
                    userConsumption.setDailyUploadLimit(dailyUploadLimit);
                    userConsumption.setUploadSize(dailyUploadSize);
                    userConsumptionRepository.save(userConsumption);
                    userContent.setUser(userRepository.findById(userContent.getUser().getId()).orElse(userContent.getUser()));
                    return userContentRepository.save(userContent);
                }
            } else {
                userConsumptionRepository.save(new UserConsumption(userContent.getContent().getDateTime(),
                        userContent.getUser(),
                        userPackage.getPackage_(),
                        userContent.getContent().getSize(), 1));

                userContent.setUser(userRepository.findById(userContent.getUser().getId()).orElse(userContent.getUser()));
                return userContentRepository.save(userContent);
            }
        }
        return null;
    }

    @Override
    public List<UserConsumption> getConsumptions() {
        return userConsumptionRepository.findAllByDateTime(LocalDateTime.now().minusDays(1), LocalDateTime.now());
    }
}
