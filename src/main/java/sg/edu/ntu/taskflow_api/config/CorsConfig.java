package sg.edu.ntu.taskflow_api.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * CORS support so the Netlify-hosted frontend can call this API
 * cross-origin (browser blocks cross-domain requests otherwise).
 *
 * For this assignment all origins are allowed. In production,
 * restrict allowedOriginPatterns to your Netlify site, e.g.
 * "https://YOUR-SITE.netlify.app".
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOriginPatterns("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*");
    }
}
