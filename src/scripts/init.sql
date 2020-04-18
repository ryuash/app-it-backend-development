SELECT 'CREATE DATABASE root'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'root')\gexec

SELECT 'CREATE DATABASE weather_app'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'weather_app')\gexec

SELECT 'CREATE DATABASE weather_app_test'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'weather_app_test')\gexec
