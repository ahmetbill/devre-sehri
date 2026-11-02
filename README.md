# Devre Şehri ⚡ · Circuit City

EHB/EEF 211 Elektrik Devre Teorisi için etkileşimli çalışma oyunu. Maskot Eli ile her ders bir durak:
**Anlat → Dene → Sına**. Türkçe ve İngilizce (akademik terminoloji: KCL, KVL, tree branch / link,
fundamental loop / cut set, two-port, VCVS…) olarak kullanılabilir.

An interactive study game for the Circuit Theory course (Chua–Desoer–Kuh, *Linear and Nonlinear Circuits*).
Available in Turkish and English. Works on phones too.

- Tek dosya: `index.html` (bağımlılık yok, derleme yok). Ayarlar: `config.js`.
- Dil: sağ üstteki 🌐 düğmesi, ya da bağlantıya `?lang=en` / `?lang=tr` ekle.
- Bir adıma doğrudan bağlantı: `…/index.html#c13-4` (bölüm c13, adım 4; adımlar 0'dan başlar).

## İçerik

| Durak | Konu |
|---|---|
| c1–c5 | Ders 1–4: akım/gerilim, KGY, KAY, Gauss yüzeyi, uç-grafı, ağaç/dal/kiriş, temel çevre ve kesitleme, A/Q/B matrisleri, Tellegen |
| c6–c9 | Ders 5–6: dirençler, DC çalışma noktası, küçük işaret, 2-kapılılar, vize provası |
| c10 | Ders 7: çok-uçlular, referans değişimi, lineer olmayan 2-kapılılar, Ebers–Moll |
| c11–c12 | Ders 8: tranzistör DC analizi, Jakobiyen, işlemsel kuvvetlendirici |
| c13 | Lineer cebir köprüsü: boş uzay, rank, bağımsızlık, diklik |
| c14 | Ders 8: düğüm gerilimleri yöntemi |

## Hata bildirme

Her sayfada sağ üstte 🐞 düğmesi var. Yazılan yorum, bulunulan bölüm / adım / soru numarasıyla birlikte
bir Google E-Tablosuna kaydedilir.

### Geri bildirim sunucusu (bir kez kurulur)

1. Google Drive → yeni **Google E-Tablo** oluştur.
2. **Uzantılar → Apps Script**; `feedback/apps-script.gs` içeriğini yapıştır, kaydet.
3. **Dağıt → Yeni dağıtım → Web uygulaması** · Yürütme: *Ben* · Erişim: *Herkes* → Dağıt, izinleri onayla.
4. `/exec` ile biten URL'yi `config.js` içindeki `feedbackUrl` alanına yaz, commit + push.
5. (İsteğe bağlı) Apps Script → Proje ayarları → Komut dosyası özellikleri → `READ_KEY` ekle.
   Sonra `URL?key=READ_KEY&status=yeni` yorumları JSON olarak verir (düzeltmeleri toplu yapmak için).

Sunucu ayarlanmadan önce gönderilen yorumlar kullanıcının tarayıcısında saklanır ve sunucu ayarlanınca
sayfa açıldığında otomatik gönderilir.

## Yayınlama (GitHub Pages)

Depo → **Settings → Pages → Build and deployment → Deploy from a branch → `main` / root**.
Birkaç dakika sonra site `https://<kullanıcı>.github.io/<depo>/` adresinde açılır.
Yeni ders eklendikçe `index.html` güncellenip push edilir; site kendiliğinden yenilenir.

> Hocanın slayt dosyaları (`*.pptx`) telif nedeniyle depoya eklenmez (`.gitignore`).
