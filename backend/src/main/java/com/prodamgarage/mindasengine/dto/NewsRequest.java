package com.prodamgarage.mindasengine.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class NewsRequest {
    private Long id;
    @NonNull
    private String name;
    @NonNull
    private String description;
    @NonNull
    private LocalDate publication;
    @NonNull
    private List<MultipartFile> multipartFiles;
}
