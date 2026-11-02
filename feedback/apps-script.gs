/** @OnlyCurrentDoc  — script yalnızca bağlı olduğu bu E-Tabloya erişebilir (izinleri daraltır). */

/**
 * Devre Şehri — geri bildirim sunucusu (Google Apps Script)
 *
 * Kurulum (bir kez):
 *  1. Google Drive'da yeni bir Google E-Tablo aç (ör. "Devre Şehri Geri Bildirim").
 *  2. Uzantılar → Apps Script. Açılan editördeki her şeyi sil, bu dosyayı yapıştır, kaydet.
 *  3. (İsteğe bağlı) Proje Ayarları → Komut dosyası özellikleri → READ_KEY = uzun rastgele bir metin.
 *     Bu anahtar, yorumları JSON olarak okumak için gerekir (aşağıdaki doGet).
 *  4. Dağıt → Yeni dağıtım → Tür: Web uygulaması
 *       Yürütme: Ben (kendi hesabın)   ·   Erişim: Herkes
 *     Dağıt'a bas, izinleri onayla, "/exec" ile biten URL'yi kopyala.
 *  5. Bu URL'yi depodaki config.js içine feedbackUrl olarak yaz ve GitHub'a gönder.
 *
 * Kod değiştirirsen: Dağıt → Dağıtımları yönet → kalem → Sürüm: Yeni sürüm (URL aynı kalır).
 */

const SHEET_NAME = 'Geri bildirim';
const HEADERS = ['Zaman', 'Dil', 'Bölüm', 'Bölüm adı', 'Adım', 'Adım tipi', 'Soru/adım', 'Kategori',
                 'Mesaj', 'İsim', 'URL', 'Tarayıcı', 'Ekran', 'Durum'];

function doPost(e) {
  try {
    const d = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (d.hp) return json_({ ok: true });                       // bot tuzağı doluysa sessizce yut
    const msg = clean_(d.message, 3000);
    if (msg.length < 3) return json_({ ok: false, error: 'empty' });

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const sh = sheet_();
      sh.appendRow([new Date(), clean_(d.lang, 5), clean_(d.chapter, 12), clean_(d.chapterTitle, 120),
        clean_(d.step, 12), clean_(d.stepType, 12), clean_(d.sub, 60), clean_(d.category, 40), msg,
        clean_(d.name, 60), clean_(d.url, 300), clean_(d.ua, 300), clean_(d.viewport, 30), 'yeni']);
    } finally {
      lock.releaseLock();
    }
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

/** Sağlık kontrolü; ?key=READ_KEY ile tüm yorumları JSON döndürür (?status=yeni ile filtrelenebilir). */
function doGet(e) {
  const p = (e && e.parameter) || {};
  const key = PropertiesService.getScriptProperties().getProperty('READ_KEY');
  if (!key || p.key !== key) return json_({ ok: true, service: 'devre-sehri-feedback' });
  const rows = sheet_().getDataRange().getValues();
  const head = rows.shift() || [];
  let items = rows.map((r, i) => {
    const o = { row: i + 2 };
    head.forEach((h, j) => o[h] = r[j]);
    return o;
  });
  if (p.status) items = items.filter(o => o['Durum'] === p.status);
  return json_({ ok: true, count: items.length, items: items });
}

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  return sh;
}

/** Metni kısalt ve E-Tablo formül enjeksiyonunu engelle (=, +, -, @ ile başlayan hücreler). */
function clean_(v, n) {
  let s = String(v == null ? '' : v).slice(0, n);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
