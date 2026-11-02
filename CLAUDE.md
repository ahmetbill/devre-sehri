# EEF211 EDT — "Devre Şehri" çalışma oyunu

Ders: İTÜ EHB/EEF 211 Elektrik Devre Teorisi (kaynak kitap: Chua–Desoer–Kuh, *Linear and Nonlinear Circuits*).
Kullanıcı öğrenci; dili **Türkçe**.

## Dosyalar
- `index.html` — tek dosyalık, bağımlılıksız interaktif ders oyunu (HTML + CSS + vanilla JS, ~2400 satır). Tüm iş burada.
- `config.js` — `window.EDT_CONFIG = { feedbackUrl: '' }` (Google Apps Script web app /exec URL'si).
- `feedback/apps-script.gs` — geri bildirimleri Google E-Tablosuna yazan sunucu kodu (kurulum adımları dosyanın başında ve README'de).
- `README.md` — kullanıcıya dönük açıklama, sunucu ve GitHub Pages kurulumu.
- `dersN_*.pptx` — hocanın slaytları (ders1 … ders8). **Depoya girmez** (`.gitignore`, telif). Ders 7'nin ilk 8 slaytı Ders 6'nın sonuyla aynı; Ders 8'in 1. slaytı Ders 7'nin sonuyla aynı.
- Site GitHub Pages ile yayınlanır (main dalı, kök dizin). Yeni ders = index.html güncelle → commit → push.

## index.html yapısı (yukarıdan aşağı, bölüm başlıklarıyla ara)
1. `<style>` — tüm CSS. Renk değişkenleri `:root`'ta. Grafik sınıfları: `.pc.s1…s7` (eğri renkleri), `.cap/.cap2/.cname/.cpm` (SVG yazı), `.wire/.csym/.term/.elem` (devre çizimi).
2. HTML iskeleti: `#map` (harita ekranı) ve `#lesson` (sol `#stage`, sağ panel: `#say` balon, `#formal` "Slayttaki resmi tanım", `#fb` geri bildirim, ileri/geri).
3. `<script>`:
   - **küçük yardımcılar**: `S(b,s)` HTML alt indis, `T(b,s)` SVG alt indis (tspan), `shuffle`, `rint`, `fmt` (eksi işareti −), `SFX`.
   - **GRAF ÇEKİRDEĞİ**: graf `{nodes:{id:[x,y]}, edges:[{id,from,to,curve}], tags}`; düğümler ekranda harf (`nn`: 1→a). `Aa(g)` tam insidans matrisi, `fundLoop/fundCut(g,tree,id)` temel çevre/kesitleme (işaretli), `findCycle`, `countTrees`, `drawGraph(svg,g,{edgeCls,nodeCls,ref,overlay,onEdge,onNode})` (svg.innerHTML'i komple yazar; ek çizim için `overlay` kullan). Graflar: `G1` (Ders 4, ağaç `T1`, kirişler `C1`), `G2` (4 düğüm 6 çizgi), `G3` (vize sorusu), `G4` (Ders 8 düğüm gerilimi devresi), `GTRI` (üçgen).
   - **DERS MOTORU**: `CHAPTERS` dizisi → her bölüm `{id:'cN', icon, title, sub, pos:[x%,y%], steps:[…]}`. Adım tipleri:
     - `{type:'talk', visual(stage,api), say, formal?, mood?}` — otomatik tamamlanır.
     - `{type:'task', setup(stage,api), say, formal?}` — görev bitince `api.done()`, hata `api.mistake()` (yıldız hesabı), `fb(html,'ok'|'bad'|'info')`.
     - `{type:'quiz', say, questions:[{q, opts, a, why, hint?, fig?}]}` — doğru şık **her zaman `a:0`** yazılır, ekranda karıştırılır.
   - Hazır görev üreticileri: `chainTask({fig(svg,k), steps})` (sınav sorusu adım adım; adım `{q, opts+a}` ya da `{q, labels, ans, tol?, anyOrder?, chip, ok, hint}`), `matrixEditor` (0/1/−1 hücreli matris doldurma), `treeTask`, `fundLoopTask`, `fundCutTask`, `runQuiz`.
   - Çizim yardımcıları: `plotter({x0,y0,w,h,xr,yr,xl,yl,step,ystep,id})` → `{base, fn, pl, dot, vl, hl, txt}`; devre sembolleri `SC.{w,dot,resV,resH,bat,src,nl,arr,t}`, ayrıca `dia` (bağımlı kaynak elması), `term`, `badge`, `opamp`, `twoPort`.
   - Lineer cebir yardımcıları: `rankOf`, `matInv`, `matMul`, `matT`, `det`, `frac` (kesir yazımı), `mxShow` (±1/0 matris), `mxN` (sayısal/kesirli matris), `matH`/`colH` (HTML matris/vektör).
   - **HARİTA**: `renderMap()`; harita 1000×820 koordinat; `pos` yüzde (y × 8.2). 3 sıra durak: sıra 1 y≈18–23, sıra 2 y≈46–50, sıra 3 y≈77–85 (6 durak: x 9, 26, 43, 60, 77, 93; sonuncusu "soon"). Yeni ders eklenince 4. sıra gerekir: harita yüksekliğini artır, mevcut y'leri yeniden ölçekle.
   - Hash ile doğrudan açma: `index.html#c12-3` (bölüm c12, adım 3; adımlar 0'dan).

## Bölümler (CHAPTERS sırası = haritadaki yol)
| id | Başlık | Kaynak |
|---|---|---|
| c1 | Akım, Gerilim ve KGY | Ders 1 |
| c2 | KAY, Gauss Yüzeyi ve Uç-Grafı | Ders 2 |
| c3 | Ağaç, Dal, Kiriş, Kesitleme | Ders 3 |
| c4 | Matrisler ve Bağımsız Denklemler (A, Q, B, Tellegen) | Ders 4 |
| c5 | Final: Yeni Bir Graf | Ders 1–4 |
| c6 | Dirençler | Ders 5 |
| c7 | DC Çalışma Noktası ve Küçük İşaret | Ders 6 |
| c8 | 2-Kapılılar (6 gösterim, bağımlı kaynaklar, transformatör) | Ders 6 sonu = Ders 7 başı |
| c9 | Vize Provası (slayt soruları) | Ders 5–6 |
| c10 | Çok-Uçlular ve Tranzistör (Chua 2-kapılı soruları, 3-uçlu referans değişimi, lineer olmayan 2-kapılı, gösterim var mı → det, Ebers–Moll) | Ders 7 sl. 9–15 |
| c11 | Tranzistör DC ve Jakobiyen (parça lineer BJT, DC Q noktası, Jakobiyen, slayt 7 sorusu) | Ders 8 sl. 1–7 |
| c12 | İşlemsel Kuvvetlendirici (ideal model, bölgeler Mi+Nv=w, buffer, geri besleme) | Ders 8 sl. 8–17 |
| c13 | Lineer Cebir Köprüsü (N(A), rank–sıfırlık, bağımsızlık, Q = A_T⁻¹A, diklik/Tellegen, özet tablo) | kullanıcı isteği |
| c14 | Düğüm Gerilimleri Yöntemi (Ĝ = A G_d Aᵀ, slayt 20 sorusu) | Ders 8 sl. 18–20 |
| soon | "Devamı Gelecek…" durağı (`soon:true`, adımsız; tıklanınca `showSoon()` modalı). **Her zaman dizinin en sonunda kalmalı**; yeni bölümleri bunun önüne ekle ve `pos`'unu kaydır. | — |

Slayt sorularının doğrulanmış cevapları (yeniden hesaplamaya gerek yok):
- Ders 7 sl.9 (a) G = [[1.5, −1], [−1, 1.5]]; (b) G = [[5/6, −1/3], [5/3, 5/6]].
- Ders 7 sl.10: v̂₁ = 2î₁ + 4v̂₂, î₂ = −5î₁ (Hibrit 1).
- Ders 8 sl.7: Q₁ = (v₁, v₂) = (1, 3), Q₂ = (−2, 12); J(Q₁) = [[3,0],[3,3]], J(Q₂) = [[−3,0],[12,0]]; v₂(t) ≈ 3 − 0.025 cos t (Q₁), 12 + 0.4 cos t (Q₂).
- Ders 8 sl.20: Ĝ = [[3/2, −1/2, 0], [−1/2, 5/6, −1/3], [0, −1/3, 10/21]], det = 13/42, i_b = (−sin t, 10, sin t), e_DC = (100, 300, 210)/13, e_s = (−5, 11, 35)/13.

## Dil desteği (TR / EN) — ZORUNLU
- `LANG` betiğin en başında belirlenir: `?lang=` parametresi > localStorage `edt_lang` > tarayıcı dili. Dil değişince sayfa yeniden yüklenir (`switchLang`).
- **Ekranda görünen her metin** `L_('türkçe','english')` ile yazılır (CHAPTERS içindeki say/formal/q/opts/why/hint/ok/labels/chip/title/sub, görev fonksiyonlarındaki fb/status metinleri, SVG etiketleri, segRow/rangeRow etiketleri dahil). `L_` yükleme anında değerlendirilir; bu yüzden dil değişimi reload ister.
- Değişken adı olarak `L` KULLANMA dışında sorun yok; çeviri fonksiyonu `L_`.
- Mantık için anahtar olarak kullanılan stringler (`'yok'`, `'çok'`, CSS sınıfı `'dal'` vb.) çevrilmez.
- Statik HTML metinleri `staticText()` içinde id üzerinden atanır.
- İngilizce terminoloji (Chua–Desoer–Kuh): KAY→KCL, KGY→KVL, ETB→branch equations, düğüm→node, çizgi→branch, dal→tree branch, kiriş→link, çevre→loop, temel çevre→fundamental loop (L(k)), kesitleme→cut set, temel kesitleme→fundamental cut set (FC(k)), referans düğüm→datum node, uyumlu çift→associated reference directions, uç-grafı→terminal graph, kapalı düğüm dizisi→closed node sequence, toplu parametreli→lumped, 2-kapılı→two-port, 1-kapılı→one-port, akım/gerilim kontrollü→current-/voltage-controlled, hibrit→hybrid, transmisyon→transmission, AKGK/GKAK/AKAK/GKGK→CCVS/VCCS/CCCS/VCVS, jiratör→gyrator, çalışma noktası→operating point, küçük işaret→small-signal, yük doğrusu→load line, parça parça lineer→piecewise-linear, işlemsel kuvvetlendirici→op amp, doyma→saturation, geri besleme→feedback, düğüm gerilimleri yöntemi→node analysis, boş uzay→null space, birim matris→identity matrix, Ders N→Lecture N.
- Kontrol: EN modda `#lesson` innerText'inde Türkçe karakter kalmamalı (test betiği aşağıda).

## Geri bildirim (🐞)
- `openFeedback()` modal formu; bağlam `fbContext()`: bölüm id/başlık, adım `SI+1/N`, `window.SUBCTX` (runQuiz → "Soru k/n", chainTask → "Adım k/n"; yeni görev türü eklersen orada da SUBCTX ayarla).
- `postFeedback` → `fetch(FEEDBACK_URL,{mode:'no-cors', Content-Type:text/plain})`. URL yoksa/başarısızsa localStorage `edt_fb_queue`'ya yazılır, açılışta `flushFeedback()` tekrar dener. 15 sn hız sınırı, `hp` bal küpü alanı.
- Yorumları okumak: Apps Script'te `READ_KEY` tanımlıysa `FEEDBACK_URL?key=…&status=yeni` JSON döner. Kullanıcı yorumları düzelttirmek isterse bu JSON'u (veya E-Tablo dışa aktarımını) iste, düzelt, E-Tablodaki "Durum" sütununu kullanıcı günceller.
- Hash: `renderStep` URL'yi `#cX-k` yapar; reload ve paylaşılan bağlantılar aynı adımı açar.

## Mobil
- `@media (max-width:860px)`: `.panel{display:contents}` + `order` ile sıra: Eli balonu → sahne → geri bildirim kutusu → resmi tanım → altta yapışkan Geri/Devam.
- `@media (max-width:700px)`: harita SVG'si gizlenir, duraklar 2 sütunlu kart ızgarası olur (inline left/top yok sayılır).
- Geniş tablolar `.tbl` yatay kaydırılır; matris editörü `.mwrap` kaydırılır. Yeni görsellerde sabit genişlik verme; SVG'ler viewBox ile ölçeklenir.

## Yazım kuralları
- Tüm metin Türkçe, maskot "Eli" ağzından samimi; terimler slaytlardaki gibi: KAY, KGY, ETB, dal, kiriş, temel çevre, temel kesitleme, uyumlu çift, AKGK/GKAK/AKAK/GKGK.
- `formal` alanına slayttaki resmi tanım/denklem yazılır; `say` sezgisel anlatım.
- Uyumlu çift: ok = akım yönü, + uç okun kuyruğunda. Düğümler harf (a, b, …), çizgiler sayı.
- Eksi için `−` (U+2212) kullan; `fmt()` bunu yapar. Ondalık cevaplarda `tol` ver.
- Yeni bölüm eklerken: `CHAPTERS`'a ekle, `pos` ver (haritada çakışmasın), gerekiyorsa harita yüksekliğini/dekorları kaydır, başlıktaki "Ders 1–N" metnini güncelle.

## Slaytları okuma (Windows)
- `python-pptx` yok. Metin: pptx'i zip olarak aç, `ppt/slides/slideN.xml` içindeki `<a:t>` metinlerini topla. Denklemlerin çoğu WMF/OLE resim olduğu için metinde görünmez.
- Görsel en güvenilir yol: PowerPoint COM ile slaytları PNG'ye aktar (dosyanın kopyası üzerinde):
  `$app = New-Object -ComObject PowerPoint.Application; $p = $app.Presentations.Open("kopya.pptx",$true,$false,$false); $p.Slides.Item(k).Export("sk.png","PNG",1600,900); $p.Close(); $app.Quit()`

## Test
- Sözdizimi: `<script>` içeriğini çıkarıp `node -e "new Function(src)"`.
- Davranış: index.html'in geçici bir kopyasına `</body>` öncesi test betiği ekle (her `CHAPTERS` adımını `openChapter`/`renderStep` ile aç, `.seg` butonlarına tıkla, sürgülere `input` olayı gönder, `chainTask` adımlarını `ans`/`a` ile otomatik çöz, sonucu bir `<pre>`'ye yaz), sonra
  `chrome.exe --headless=new --virtual-time-budget=8000 --dump-dom file:///…/test.html`.
- Görsel: `chrome.exe --headless=new --window-size=1400,1000 --screenshot=out.png "file:///…/index.html?lang=en#c13-4"`.
- Mobil görsel: headless Chrome pencere genişliği ~500 px'in altına inmez; 375 px testi için sayfayı `<iframe style="width:375px;height:1500px">` içine koyan geçici bir sarmalayıcıyı (proje klasöründe, `_m_*.html`, sonra sil) 600 px pencereyle ekran görüntüsüne al.
- EN sızıntı testi: `?lang=en` ile her adımı render et, `#lesson` innerText'inde `/[çğışÇĞİŞ]/` ara (Königsberg hariç); CHAPTERS ve EX*/REPS/EXIST dizilerini de özyinelemeli tara.
- İlerleme localStorage anahtarı: `edt_eli_v1`.
