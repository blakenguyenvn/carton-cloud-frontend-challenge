server:
	cd backend && php -S localhost:8000

frontend:
	cd webapp && make all

start:
	cd webapp && make start
