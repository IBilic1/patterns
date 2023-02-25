package hr.algebra.service.impl;

import hr.algebra.model.User;
import hr.algebra.model.UserConsumption;
import hr.algebra.model.UserPackage;
import hr.algebra.repository.PackageRepository;
import hr.algebra.repository.UserConsumptionRepository;
import hr.algebra.repository.UserPackageRepository;
import hr.algebra.repository.UserRepository;
import hr.algebra.service.UserPackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserPackageServiceImpl implements UserPackageService {

    private final PackageRepository packageRepository;

    private final UserRepository userRepository;

    private final UserPackageRepository userPackageRepository;

    private final UserConsumptionRepository userConsumptionRepository;

    @Autowired
    public UserPackageServiceImpl(PackageRepository packageRepository, UserRepository userRepository, UserPackageRepository userPackageRepository, UserConsumptionRepository userConsumptionRepository) {
        this.packageRepository = packageRepository;
        this.userPackageRepository = userPackageRepository;
        this.userRepository = userRepository;
        this.userConsumptionRepository = userConsumptionRepository;
    }

    @Override
    public User signIn(UserPackage userPackage) {
        userPackage.setPackage_(packageRepository.findById(userPackage.getPackage_().getId()).orElse(userPackage.getPackage_()));
        if (userRepository.existsByEmail(userPackage.getUser().getEmail()) == null) {
            UserPackage savedUser = userPackageRepository.saveAndFlush(userPackage);
            return savedUser.getUser();
        }
        return null;
    }

    @Override
    public boolean updatePackage(UserPackage userPackage) {
        List<UserPackage> byDateTime = userPackageRepository.findByDateTime(userPackage.getUser().getId(), userPackage.getDateTime().minusDays(1), userPackage.getDateTime());
        if (byDateTime.size() == 1) {
            userPackage.setPackage_(packageRepository.findById(userPackage.getPackage_().getId()).orElse(userPackage.getPackage_()));
            userPackage.setUser(userRepository.findById(userPackage.getUser().getId()).orElse(userPackage.getUser()));
            userPackageRepository.save(userPackage);
            userConsumptionRepository.save(new UserConsumption(userPackage.getDateTime(),
                    userPackage.getUser(),
                    userPackage.getPackage_(),
                    0, 0));
            return true;
        }

        return false;
    }

    @Override
    public List<UserPackage> getAllUsers() {
        List<UserPackage> orderListOfUserPackages = new ArrayList<>();
        for (User user :
                userRepository.findAll()) {
            List<UserPackage> last = userPackageRepository.findLast(user.getId());
            if (last.size() > 0) orderListOfUserPackages.add(last.get(0));
        }
        return orderListOfUserPackages;
    }
}
