package com.prodamgarage.mindasengine.dto;


import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@RequiredArgsConstructor
public class ProjectRequest {
    Long id;
    @NonNull
    private String name;
    @NonNull
    private String description;
    @NonNull
    private List<MultipartFile> multipartFiles;
}
