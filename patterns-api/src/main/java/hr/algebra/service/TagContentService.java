package hr.algebra.service;

import hr.algebra.model.Tag;
import hr.algebra.model.TagContent;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TagContentService {

    List<Tag> getAllTags();

    List<TagContent> getAllTagsContent();

    TagContent addTagContent(TagContent tagContent);

    TagContent removeTagContent(TagContent tagContent);
}
