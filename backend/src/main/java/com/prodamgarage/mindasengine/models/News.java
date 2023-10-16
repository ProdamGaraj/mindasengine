package com.prodamgarage.mindasengine.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "news")
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class News {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NonNull
    private String name;
    @NonNull
    private String description;
    @NonNull
    @Column(columnDefinition = "DATE")
    private LocalDate publication;
}
