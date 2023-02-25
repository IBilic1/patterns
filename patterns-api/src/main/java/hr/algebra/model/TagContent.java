package hr.algebra.model;

import javax.persistence.*;
@Entity
public class TagContent {

    @Id
    @Column(name = "id_tag_content")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade=CascadeType.ALL)
    @JoinColumn(name = "tag_id")
    private Tag tag;

    @ManyToOne(cascade=CascadeType.ALL)
    @JoinColumn(name = "content_id")
    private Content content;
    public TagContent() {
    }

    public TagContent(Long id, Tag tag, Content content) {
        this.id = id;
        this.tag = tag;
        this.content = content;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Tag getTag() {
        return tag;
    }

    public void setTag(Tag tag) {
        this.tag = tag;
    }

    public Content getContent() {
        return content;
    }

    public void setContent(Content content) {
        this.content = content;
    }
}
