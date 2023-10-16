package com.prodamgarage.mindasengine.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "photo")
@Data
public class Photo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String filename;
    @ManyToOne
    @JoinColumn(name = "fk_project_id")
    private Project project;
    @ManyToOne
    @JoinColumn(name = "fk_news_id")
    private News news;

    public Photo(String filename, Project project, News news) {
        this.filename = filename;
        this.project = project;
        this.news = news;
    }

    public Photo() {

    }
}
