package mercado.emark;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableFeignClients(basePackages = "mercado.emark.clients") // <-- Ativa o Feign Client
@EntityScan("mercado.emark.model")
@EnableJpaRepositories("mercado.emark.repository")
public class EmarkApplication {
    public static void main(String[] args) {
        SpringApplication.run(EmarkApplication.class, args);
    }
}
