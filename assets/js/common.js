document.addEventListener("DOMContentLoaded", function () {
  // 모달열기
  function modalOpen(obj) {
    var selector = obj.getAttribute("data-link");
    var popup = document.querySelector(selector);
		if (!popup) return;
		document.documentElement.classList.add("is-opened");
    popup.style.display = "block";
		popup.style.opacity = 0;
		void popup.offsetWidth;
		setTimeout(function () {
			popup.style.transition = "opacity 0.5s ease";
			popup.style.opacity = 1;
		}, 10);
  }
	window.modalOpen = modalOpen;

  // 모달닫기
	function modalClose(obj) {
		var popup = obj.closest(".modal__container");
		if (!popup) return;
		popup.style.transition = "opacity 0.5s ease";
		popup.style.opacity = 0;
		setTimeout(function () {
			popup.style.display = "none";
			popup.style.transition = "";
			popup.style.opacity = "";
		}, 500);
		document.documentElement.classList.remove("is-opened");
	}
	window.modalClose = modalClose;

  // 모달열기 버튼
  document.querySelectorAll(".btn__modal").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      modalOpen(btn);
    });
  });

  // 모달닫기 버튼
  document.querySelectorAll(".modal__close").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      modalClose(btn);
    });
  });

	document.querySelectorAll(".modal__container, .filter-layer").forEach(function(modal) {
    var dim = modal.querySelector(".dim");
    if (dim) {
      dim.addEventListener("click", function(e) {
        modalClose(dim);
      });
    }
  });

	// 반응형
	window.isPC = window.isPC || function() {
		return window.innerWidth >= 750;
	};
	// GNB
  var btnNav = document.querySelector(".btn__nav");
	var gnb = document.querySelector(".gnb");
	var header = document.querySelector(".header");
  if (btnNav) {
    btnNav.addEventListener("click", function () {
			event.stopPropagation();
			document.documentElement.classList.toggle("nav-opened");
			btnNav.classList.toggle("is-active");
			if (btnNav.classList.contains("is-active")) {
				header.style.zIndex = "11";
			} else {
				header.style.zIndex = "";
			}
    });
		document.addEventListener("click", function (event) {
			if (gnb && !gnb.contains(event.target)) {
				document.documentElement.classList.remove("nav-opened");
				btnNav.classList.remove("is-active");
				header.style.zIndex = "";
			}
		});
  }
	// 토글 버튼
  document.querySelectorAll('.btn__toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      btn.classList.toggle('is-active');
    });
  });
	function setupTooltipEvents() {
		document.querySelectorAll('.btn__tooltip').forEach(function(btn) {
			btn.replaceWith(btn.cloneNode(true));
		});
		document.querySelectorAll('.btn__tooltip').forEach(function(btn) {
			const tooltipWrap = btn.closest('.tooltip--wrap');
			if (btn.classList.contains('btn__option')) {
				btn.addEventListener('click', onTooltipClick);
				tooltipWrap.removeEventListener('mouseenter', onTooltipMouseEnter);
				tooltipWrap.removeEventListener('mouseleave', onTooltipMouseLeave);
			} else if (window.isPC()) {
				tooltipWrap.addEventListener('mouseenter', onTooltipMouseEnter);
				tooltipWrap.addEventListener('mouseleave', onTooltipMouseLeave);
				btn.removeEventListener('click', onTooltipClick);
			} else {
				btn.addEventListener('click', onTooltipClick);
				tooltipWrap.removeEventListener('mouseenter', onTooltipMouseEnter);
				tooltipWrap.removeEventListener('mouseleave', onTooltipMouseLeave);
			}
		});
	}
	function onTooltipClick(e) {
		e.stopPropagation();
		if (this.classList.contains('btn__option')) {
			const isActive = this.classList.contains('is-active');
			document.querySelectorAll('.btn__option.is-active').forEach(function(activeBtn) {
				activeBtn.classList.remove('is-active');
			});
			if (!isActive) {
				this.classList.add('is-active');
			}
		} else {
			this.classList.toggle('is-active');
		}
	}
	function onTooltipMouseEnter(e) {
		const btn = this.querySelector('.btn__tooltip');
		if (btn) btn.classList.add('is-active');
	}
	function onTooltipMouseLeave(e) {
		const btn = this.querySelector('.btn__tooltip');
		if (btn) btn.classList.remove('is-active');
	}
	setupTooltipEvents();
	window.addEventListener('resize', setupTooltipEvents);
	//알림레이어 호출
  var notificationWrap = document.querySelector('.notification--wrap');
  var notificationContent = document.querySelector('.notification--wrap .noti__content');
  if (!notificationWrap) return;
  var allNotiButtons = document.querySelectorAll('.btn__noti');
  allNotiButtons.forEach(function(btn) {
    btn.addEventListener('click', function(event) {
      event.stopPropagation();
      var isOpened = notificationWrap.classList.contains('is-opened');
      if (isOpened) {
        document.documentElement.classList.remove('noti-opened');
        notificationWrap.classList.remove('is-opened');
      } else {
        document.documentElement.classList.add('noti-opened');
        notificationWrap.classList.add('is-opened');
      }
    });
  });
  document.addEventListener('click', function(event) {
    if (!notificationContent || !notificationContent.contains(event.target)) {
      document.documentElement.classList.remove('noti-opened');
      notificationWrap.classList.remove('is-opened');
    }
  });
	//워크로드 리스트(리스트형) 이벤트
	const listItems = document.querySelectorAll('.type-flex-body ul li');
  // PC용 마우스 오버 이벤트
	function setupPC() {
		listItems.forEach((li) => {
			li.addEventListener('mouseenter', onMouseEnter);
			li.addEventListener('mouseleave', onMouseLeave);
			li.removeEventListener('click', onItemClick);
			// 삭제: btnMore.removeEventListener('click', onBtnClick);
		});
	}
  // mo용 버튼 클릭 이벤트
  function setupMobile() {
		listItems.forEach((li) => {
			li.removeEventListener('mouseenter', onMouseEnter);
			li.removeEventListener('mouseleave', onMouseLeave);
			li.addEventListener('click', onItemClick);
		});
	}
  function onMouseEnter(e) {
    e.currentTarget.classList.add('is-active');
  }
  function onMouseLeave(e) {
    e.currentTarget.classList.remove('is-active');
  }
  function onItemClick(e) {
		const li = e.currentTarget;
		if (!li) return;
		li.classList.toggle('is-active');
	}
  function setupEvents() {
		if (window.isPC()) {
			setupPC();
		} else {
			setupMobile();
		}
	}
	setupEvents();
	window.addEventListener('resize', () => {
		setupEvents();
	});
	// 파일첨부 커스텀
	document.querySelectorAll(".file__custom").forEach(function(input) {
		input.addEventListener("change", function() {
			var fileName = input.value.split("\\").pop();
			var uploadTitle = input.parentNode.querySelector(".upload__title");
			if (uploadTitle) {
				uploadTitle.value = fileName;
			}
			var filebox = input.closest(".filebox");
			if (filebox) {
				if (fileName.length > 0) {
					filebox.classList.add("on");
				}
			}
		});
	});
	document.querySelectorAll(".filebox .btn__reset").forEach(function(btn) {
		btn.addEventListener("click", function(e) {
			e.preventDefault();
			var uploadTitle = btn.parentNode.querySelector(".upload__title");
			if (uploadTitle) {
				uploadTitle.value = "";
			}
			var filebox = btn.closest(".filebox");
			if (filebox) {
				filebox.classList.remove("on");
			}
		});
	});
});
