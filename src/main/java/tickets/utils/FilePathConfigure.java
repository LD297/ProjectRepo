package tickets.utils;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Created by a297 on 18/3/15.
 */
@Configuration
public class FilePathConfigure extends WebMvcConfigurerAdapter {
    public static final String PATH = "/Users/a297/Desktop/Tickets/static/";

    //供客户端使用的url前缀
    public static final String URL = "http://localhost:8080/api/static/";

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/api/static/**").addResourceLocations("file:" + PATH);
        super.addResourceHandlers(registry);
    }
}
