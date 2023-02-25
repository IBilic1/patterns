package hr.algebra.controller;

import hr.algebra.model.Tag;
import hr.algebra.model.TagContent;
import hr.algebra.service.TagContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/tag-content")
@CrossOrigin
public class TagContentController {

    private final TagContentService tagContentService;


    @Autowired
    public TagContentController(TagContentService tagContentService) {
        this.tagContentService = tagContentService;
    }

    @GetMapping("/tags")
    public ResponseEntity<List<Tag>> getAllTags() {
        return new ResponseEntity<>(tagContentService.getAllTags(), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<TagContent>> getAllTagContent() {
        return new ResponseEntity<>(tagContentService.getAllTagsContent(), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<TagContent> addNewTag(@RequestBody TagContent contentTag) {
        return new ResponseEntity<>(tagContentService.addTagContent(contentTag), HttpStatus.OK);
    }

    @PutMapping()
    public ResponseEntity<TagContent> updateTagContent(@RequestBody TagContent contentTag) {
        return new ResponseEntity<>(tagContentService.removeTagContent(contentTag), HttpStatus.OK);
    }
}
