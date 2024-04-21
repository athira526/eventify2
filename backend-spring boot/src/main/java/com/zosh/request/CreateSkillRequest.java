package com.zosh.request;

import lombok.Data;

@Data
public class CreateSkillRequest {

    private Long festId;
    private String name;
    private Long skillCategoryId;
}
