server:
	cd backend && php -S localhost:8000

frontend:
	cd webapp && make all

start_frontend:
	cd webapp && make start
