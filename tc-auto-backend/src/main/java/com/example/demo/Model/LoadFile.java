package com.example.demo.Model;

import lombok.Data;

@Data
public class LoadFile {

    private String filename;
    private String fileType;
    private String fileSize;
    private byte[] file;

    public LoadFile() {

    }

}
