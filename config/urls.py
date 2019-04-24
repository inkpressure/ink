from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from oscar.app import application
from django.views.generic import TemplateView
from django.views import defaults as default_views

urlpatterns = [
    path("", application.urls),
    path("i18n/", include("django.conf.urls.i18n")),
    path("", TemplateView.as_view(template_name="pages/home.html"), name="home"),
    path(
        "shopping/",
        TemplateView.as_view(template_name="pages/shopping.html"),
        name="shopping",
    ),
    # Django Admin, use {% url 'admin:index' %}
    path(settings.ADMIN_URL, admin.site.urls),
    # User management

    path("users/", include("ink.users.urls", namespace="users")),
    path("accounts/", include("allauth.urls")),
    #
    # Your stuff: custom urls includes go here
    #
    path("inky/", include("squeeze.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += [
        path(
            "400/",
            default_views.bad_request,
            kwargs={"exception": Exception("Bad Request!")},
        ),
        path(
            "403/",
            default_views.permission_denied,
            kwargs={"exception": Exception("Permission Denied")},
        ),
        path(
            "404/",
            default_views.page_not_found,
            kwargs={"exception": Exception("Page not Found")},
        ),
        path("500/", default_views.server_error),
    ]
    if "debug_toolbar" in settings.INSTALLED_APPS:
        import debug_toolbar

        urlpatterns = [path("__debug__/", include(debug_toolbar.urls))] + urlpatterns
