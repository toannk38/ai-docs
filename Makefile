# Lệnh thường dùng cho cẩm nang NAB. Gõ `make` (hoặc `make help`) để xem danh sách.
# Python luôn chạy qua uv.

SHELL := /bin/bash
.DEFAULT_GOAL := help

PY      := PYTHONDONTWRITEBYTECODE=1 uv run --no-project python
PYTEST  := PYTHONDONTWRITEBYTECODE=1 uv run --no-project --with pytest python -m pytest -q -p no:cacheprovider
SITE    := html_docs
DIST    := $(SITE)/dist
PREVIEW := $(DIST)/preview
PORT    ?= 8765
HOST    ?= 0.0.0.0
# Chỉ những thứ trang web cần (gói phát hành) — máy chủ xem thử không phơi qa/, tools/, docs/…
RELEASE := index.html chapters assets logo

.PHONY: help install build check leaks verify test test-py test-node test-capture typecheck baseline package serve clean

help: ## Hiện danh sách lệnh
	@grep -hE '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | awk 'BEGIN{FS=":.*?## "}{printf "  \033[36mmake %-13s\033[0m %s\n", $$1, $$2}'
	@echo "  Biến: PORT=$(PORT) HOST=$(HOST)  (vd: make serve PORT=9000)"

install: ## Cài thư viện Node (Playwright, tsx…) cho test/chụp ảnh
	npm ci

build: ## Build lại index.html và chapters/
	cd $(SITE) && node tools/build-site.js

check: ## Chạy checker phát hành (qa/check-release.py)
	cd $(SITE) && $(PY) qa/check-release.py

leaks: ## Quét chuỗi/URL POC trong gói phát hành
	$(PY) capture/check_env_leaks.py $(SITE)

verify: build check leaks test typecheck baseline ## Build + kiểm tra + toàn bộ test (chạy trước khi đóng gói/commit)

test: test-py test-node test-capture ## Chạy toàn bộ test

test-py: ## Test Python (checker, quét rò rỉ, script đóng gói)
	$(PYTEST) $(SITE)/qa/tests capture/tests/test_check_env_leaks.py

test-node: ## Test bộ build (Node)
	node --test $(SITE)/tools/tests/*.test.js

test-capture: ## Test công cụ chụp ảnh + kiểm tra trang đã build bằng trình duyệt
	npx tsx --test capture/tests/*.test.ts

typecheck: ## Kiểm tra kiểu TypeScript của capture/
	npm run -s typecheck

baseline: ## Đối chiếu 18 chương không thuộc Amazon Quick với bản gốc
	npx tsx capture/compare-baseline.ts

package: ## Build + kiểm tra + đóng gói zip vào html_docs/dist/
	$(PY) $(SITE)/tools/package_site.py

serve: ## Xem thử trang qua http://<máy>:PORT (chỉ phục vụ gói phát hành)
	@rm -rf $(PREVIEW) && mkdir -p $(PREVIEW)
	@for f in $(RELEASE); do ln -s "$(CURDIR)/$(SITE)/$$f" "$(PREVIEW)/$$f"; done
	@echo "Đang phục vụ $(PREVIEW) tại http://$(HOST):$(PORT)/  (Ctrl+C để dừng)"
	cd $(PREVIEW) && $(PY) -m http.server $(PORT) --bind $(HOST)

clean: ## Xoá html_docs/dist/ (file zip + thư mục xem thử)
	rm -rf $(DIST)
