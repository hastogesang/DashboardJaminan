package com.dashboard.configuration;

import javax.sql.DataSource;

import com.zaxxer.hikari.HikariDataSource;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(basePackages = "com.dashboard.repository.skd",
        entityManagerFactoryRef = "skdEntityManagerFactory",
        transactionManagerRef= "skdTransactionManager"
)
public class SkdDataSourceConfiguration {
    @Bean
    @ConfigurationProperties("spring.datasource.skd")
    public DataSourceProperties skdDataSourceProperties() {
        return new DataSourceProperties();
    }
    @Bean
    @ConfigurationProperties("spring.datasource.skd.configuration")
    public DataSource skdDataSource() {
        return skdDataSourceProperties().initializeDataSourceBuilder()
                .type(HikariDataSource.class).build();
    }
    
    @Bean(name = "skdEntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean skdEntityManagerFactory(EntityManagerFactoryBuilder builder) {
        return builder
                .dataSource(skdDataSource())
                .packages("com.dashboard.model.skd")
                .build();
    }

    @Bean(name = "skdTransactionManager")
    public PlatformTransactionManager skdTransactionManager(
            final @Qualifier("skdEntityManagerFactory") LocalContainerEntityManagerFactoryBean skdEntityManagerFactory) {
        return new JpaTransactionManager(skdEntityManagerFactory.getObject());
    }
}
