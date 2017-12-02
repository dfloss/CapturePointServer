docker run --name capturepostgres -e POSTGRES_PASSWORD=capture -e POSTGRES_USER=capturepoint -e POSTGRES_DB=capturepoint_dev -p 5432:5432 -d postgres
