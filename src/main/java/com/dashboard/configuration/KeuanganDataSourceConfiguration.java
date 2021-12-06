package com.dashboard.configuration;

import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import com.zaxxer.hikari.HikariDataSource;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(basePackages = "com.dashboard.repository.keuangan",
        entityManagerFactoryRef = "keuanganEntityManagerFactory",
        transactionManagerRef= "keuanganTransactionManager"
)

public class KeuanganDataSourceConfiguration {
    @Bean
    @Primary
    @ConfigurationProperties("spring.datasource.keuangan")
    public DataSourceProperties keuanganDataSourceProperties() {
        return new DataSourceProperties();
    }
    @Bean
    @Primary
    @ConfigurationProperties("spring.datasource.keuangan.configuration")
    public DataSource keuanganDataSource() {
        return keuanganDataSourceProperties().initializeDataSourceBuilder()
                .type(HikariDataSource.class).build();
    }
    
    @Primary
    @Bean(name = "keuanganEntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean keuanganEntityManagerFactory(EntityManagerFactoryBuilder builder) {
        Map<String, Object> properties = new HashMap<>();
        properties.put("hibernate.hbm2ddl.auto", "update");
        properties.put("hibernate.dialect", "org.hibernate.dialect.SQLServer2012Dialect");
        return builder
                .dataSource(keuanganDataSource())
                .packages("com.dashboard.model.keuangan")
                .properties(properties)
                .build();
    }

    @Primary
    @Bean(name = "keuanganTransactionManager")
    public PlatformTransactionManager keuanganTransactionManager(
            final @Qualifier("keuanganEntityManagerFactory") LocalContainerEntityManagerFactoryBean keuanganEntityManagerFactory) {
        return new JpaTransactionManager(keuanganEntityManagerFactory.getObject());
    }
}
