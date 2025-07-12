

.PHONY: key:\generate

key:\generate: docker compose exec backend ./generate_admin_key.sh