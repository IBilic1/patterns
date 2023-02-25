package hr.algebra.repository;

import hr.algebra.model.Tag;
import hr.algebra.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Long> {

    @Query("SELECT u FROM Tag u WHERE u.title = ?1")
    Optional<Tag> findByTitle(String title);
}
