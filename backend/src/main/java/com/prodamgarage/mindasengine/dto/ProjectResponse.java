package com.prodamgarage.mindasengine.dto;

import com.prodamgarage.mindasengine.models.Project;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class ProjectResponse {
    @NonNull
    private Project project;
    @NonNull
    private List<String> files;
}
