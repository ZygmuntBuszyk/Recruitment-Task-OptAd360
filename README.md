# Recruitment-Task-OptAd360
Ogólny zarys
Od 2012 roku przeglądaniu sieci towarzyszą powiadomienia o zbieraniu ciasteczek przez
każdą ze stron, którą odwiedzasz. W związku tym, że w naszej firmie mamy do czynienia z
danymi wrażliwymi prosimy Cię o zbudowania narzędzia, które będzie pobierać od
użytkownika decyzję odnośnie przetwarzania danych osobowych.

Szczegółowa specyfikacja
Stworzone narzędzie musi spełniać poniższe założenia:
● Powinno zostać napisane w czystym JS/TS, żadnych dodatkowych bibliotek,
frameworków, jQuery
● Może być osadzone w dowolnym miejscu strony (head lub body)
● Powinno uruchomić się najszybciej jak to możliwe
● Musi wyświetlić popup informacyjny na środku strony o tytule “GDPR consent”,
jednocześnie wyłączając możliwość scrollowania strony
● Popup musi zawierać listę zaufanych partnerów (vendors) pobranych z
https://api.optad360.com/vendorlist
Dodatkowo przy każdym z partnerów powinien pojawić się link do polityki cookie,
oraz możliwość ich akceptacji
● Popup musi zawierać dwa przyciski: Accept oraz Reject, decyzja użytkownika wraz z
zaakceptowanymi partnerami powinna zostać zapisana w cookies
● Po odświeżeniu strony popup powinien wyświetlić się ponownie, jednak dopiero po
24 godzinach od poprzedniej decyzji użytkownika
● Narzędzie musi być kompatybilne z nowoczesnymi przeglądarkami
Będzie super jeśli do tego
● Popup będzie wyświetlał się tylko na stronach z protokołem https
● Narzędzie będzie skompilowane do ES5