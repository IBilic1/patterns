package hr.algebra.repository;

import hr.algebra.model.Tag;
import hr.algebra.model.TagContent;
import hr.algebra.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TagContentRepository extends JpaRepository<TagContent, Long> {

    @Query("SELECT u FROM TagContent u WHERE u.tag.title = ?1 AND u.content.id = ?2")
    List<TagContent> findByTitleAndPackage(String title, Long idContent);
}
