package com.zosh.request;



import java.util.List;

import com.zosh.model.Category;
import com.zosh.model.SkillsItem;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateActivityRequest {
	

    
    private String name;
    private String description;
    private Long price;
    
  
    private Category category;
    private List<String> images;

   
    private Long festId;
    
    private boolean offline;
    private boolean groupevent;
    
    
    private List<SkillsItem> skills;
	

}
