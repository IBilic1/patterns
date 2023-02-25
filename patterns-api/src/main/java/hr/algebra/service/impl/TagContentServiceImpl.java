package hr.algebra.service.impl;

import hr.algebra.model.Tag;
import hr.algebra.model.TagContent;
import hr.algebra.repository.ContentRepository;
import hr.algebra.repository.TagContentRepository;
import hr.algebra.repository.TagRepository;
import hr.algebra.service.TagContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagContentServiceImpl implements TagContentService {

    private final TagContentRepository tagContentRepository;

    private final ContentRepository contentRepository;

    private final TagRepository tagRepository;

    @Autowired
    public TagContentServiceImpl(TagContentRepository tagContentRepository, TagRepository tagRepository, ContentRepository contentRepository) {
        this.tagContentRepository = tagContentRepository;
        this.tagRepository = tagRepository;
        this.contentRepository = contentRepository;
    }

    @Override
    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }

    @Override
    public List<TagContent> getAllTagsContent() {
        return tagContentRepository.findAll();
    }

    @Override
    public TagContent addTagContent(TagContent tagContent) {
        tagContent.setContent(contentRepository.findById(tagContent.getContent().getId()).orElse(tagContent.getContent()));
        tagContent.setTag(tagRepository.findByTitle(tagContent.getTag().getTitle()).orElse(tagContent.getTag()));

        if (tagContentRepository.findByTitleAndPackage(tagContent.getTag().getTitle(), tagContent.getContent().getId()).size() == 0) {
            return tagContentRepository.save(tagContent);
        }
        return null;
    }

    @Override
    public TagContent removeTagContent(TagContent tagContent) {
        tagContentRepository.delete(tagContent);
        return tagContent;
    }
}
