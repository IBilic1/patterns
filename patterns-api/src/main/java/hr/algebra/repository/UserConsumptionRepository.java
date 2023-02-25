package hr.algebra.repository;


import hr.algebra.model.Package;
import hr.algebra.model.User;
import hr.algebra.model.UserConsumption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface UserConsumptionRepository extends JpaRepository<UserConsumption, Long> {

    @Query(value = "SELECT u FROM UserConsumption u WHERE u.user.id = ?1.id and u.package_.id = ?2 ORDER BY u.dateTime desc LIMIT 1", nativeQuery = true)
    Optional<UserConsumption> findByUserAndPackage(User user, Package package_);

    @Query("SELECT u FROM UserConsumption u WHERE u.dateTime between ?2 and ?3 and u.user.id = ?1 ORDER BY u.dateTime desc")
    List<UserConsumption> findByDateTime(Long idUser, LocalDateTime startDateTime, LocalDateTime endDateTime);

    @Query("SELECT u FROM UserConsumption u WHERE u.dateTime between ?1 and ?2 ORDER BY u.dateTime desc")
    List<UserConsumption> findAllByDateTime(LocalDateTime startDateTime, LocalDateTime endDateTime);
}
