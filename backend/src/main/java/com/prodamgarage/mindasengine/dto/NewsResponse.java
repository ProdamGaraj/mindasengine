package com.prodamgarage.mindasengine.dto;

import com.prodamgarage.mindasengine.models.News;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class NewsResponse {
    @NonNull
    private News news;
    @NonNull
    private List<String> files;
}
