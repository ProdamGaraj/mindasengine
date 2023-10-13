package com.prodamgarage.mindasengine.dto;

public class ResourceWrapper {
    private String filename;
    private String url;
    public ResourceWrapper(String filename, String url) {
        this.filename = filename;
        this.url = url;
    }

    public String getFilename() {
        return filename;
    }

    public String getUrl() {
        return url;
    }
}
