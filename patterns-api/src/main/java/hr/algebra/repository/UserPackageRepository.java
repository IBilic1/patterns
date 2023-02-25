package hr.algebra.repository;

import hr.algebra.model.User;
import hr.algebra.model.UserPackage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserPackageRepository extends JpaRepository<UserPackage, Long> {

    @Query("SELECT u FROM UserPackage u WHERE u.dateTime between ?2 and ?3 and u.user.id = ?1")
    List<UserPackage> findByDateTime(Long idUser, LocalDateTime startDateTime, LocalDateTime endDateTime);


    @Query(value = "SELECT u FROM UserPackage u WHERE u.user.id = ?1 ORDER BY u.dateTime desc")
    List<UserPackage> findLast(Long idUser);

    @Query(value = "SELECT u FROM UserPackage u ORDER BY u.dateTime desc")
    List<UserPackage> findAllSortedByDateTime();
}
