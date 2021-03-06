package com.dashboard.configuration;

import java.util.List;

import com.dashboard.model.keuangan.Menu;
import com.dashboard.model.keuangan.MenuRole;
import com.dashboard.model.keuangan.UserDetailServiceImpl;
import com.dashboard.repository.keuangan.MenuRepo;
import com.dashboard.repository.keuangan.MenuRoleRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Bean
    public UserDetailsService userDetailsService(){
        return new UserDetailServiceImpl();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setPasswordEncoder(passwordEncoder());
        authProvider.setUserDetailsService(userDetailsService());

        return authProvider;
    }

    @Override
    protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authenticationProvider());
    }

    @Autowired
    private MenuRoleRepo menuRoleRepo;

    @Autowired
    private MenuRepo menuRepo;

    @Override
    protected void configure(final HttpSecurity http) throws Exception {
        String[] staticResources  =  {
            "/css/**",
            "/img/**",
            "/css/login/**"
        };

        http.authorizeRequests()
            .antMatchers(staticResources).permitAll()
            .anyRequest().authenticated();
        http.formLogin()
            .loginPage("/login")
            .usernameParameter("username")
            .passwordParameter("password")
            .defaultSuccessUrl("/", true)
            .permitAll()
            .and().rememberMe().rememberMeParameter("RememberMe").tokenValiditySeconds(7 * 24 * 60 * 60)
            .and().logout().deleteCookies("JSESSIONID").permitAll().and().csrf().disable();
    }

}
