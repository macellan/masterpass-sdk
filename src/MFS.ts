/*! mfs-client 24-02-2021 */

// @ts-nocheck
/* eslint-disable */

import axios from 'axios'
import type { MasterPassSDKMethods } from './Types'

var SDK: MasterPassSDKMethods = {}

var dbits,
  canary = 0xdeadbeefcafe,
  j_lm = 15715070 == (16777215 & canary)
function BigInteger(t, e, r) {
  null != t &&
    ('number' == typeof t
      ? this.fromNumber(t, e, r)
      : null == e && 'string' != typeof t
      ? this.fromString(t, 256)
      : this.fromString(t, e))
}
function nbi() {
  return new BigInteger(null)
}
function am1(t, e, r, n, o, i) {
  for (; 0 <= --i; ) {
    var s = e * this[t++] + r[n] + o
    ;(o = Math.floor(s / 67108864)), (r[n++] = 67108863 & s)
  }
  return o
}
function am2(t, e, r, n, o, i) {
  for (var s = 32767 & e, a = e >> 15; 0 <= --i; ) {
    var u = 32767 & this[t],
      c = this[t++] >> 15,
      l = a * u + c * s
    ;(o =
      ((u = s * u + ((32767 & l) << 15) + r[n] + (1073741823 & o)) >>> 30) +
      (l >>> 15) +
      a * c +
      (o >>> 30)),
      (r[n++] = 1073741823 & u)
  }
  return o
}
function am3(t, e, r, n, o, i) {
  for (var s = 16383 & e, a = e >> 14; 0 <= --i; ) {
    var u = 16383 & this[t],
      c = this[t++] >> 14,
      l = a * u + c * s
    ;(o =
      ((u = s * u + ((16383 & l) << 14) + r[n] + o) >> 28) + (l >> 14) + a * c),
      (r[n++] = 268435455 & u)
  }
  return o
}
;(dbits =
  j_lm && 'Microsoft Internet Explorer' == navigator.appName
    ? ((BigInteger.prototype.am = am2), 30)
    : j_lm && 'Netscape' != navigator.appName
    ? ((BigInteger.prototype.am = am1), 26)
    : ((BigInteger.prototype.am = am3), 28)),
  (BigInteger.prototype.DB = dbits),
  (BigInteger.prototype.DM = (1 << dbits) - 1),
  (BigInteger.prototype.DV = 1 << dbits)
var BI_FP = 52
;(BigInteger.prototype.FV = Math.pow(2, BI_FP)),
  (BigInteger.prototype.F1 = BI_FP - dbits),
  (BigInteger.prototype.F2 = 2 * dbits - BI_FP)
for (
  var BI_RM = '0123456789abcdefghijklmnopqrstuvwxyz',
    BI_RC = new Array(),
    rr = '0'.charCodeAt(0),
    vv = 0;
  vv <= 9;
  ++vv
)
  BI_RC[rr++] = vv
for (rr = 'a'.charCodeAt(0), vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv
for (rr = 'A'.charCodeAt(0), vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv
function int2char(t) {
  return BI_RM.charAt(t)
}
function intAt(t, e) {
  e = BI_RC[t.charCodeAt(e)]
  return null == e ? -1 : e
}
function bnpCopyTo(t) {
  for (var e = this.t - 1; 0 <= e; --e) t[e] = this[e]
  ;(t.t = this.t), (t.s = this.s)
}
function bnpFromInt(t) {
  ;(this.t = 1),
    (this.s = t < 0 ? -1 : 0),
    0 < t ? (this[0] = t) : t < -1 ? (this[0] = t + this.DV) : (this.t = 0)
}
function nbv(t) {
  var e = nbi()
  return e.fromInt(t), e
}
function bnpFromString(t, e) {
  var r
  if (16 == e) r = 4
  else if (8 == e) r = 3
  else if (256 == e) r = 8
  else if (2 == e) r = 1
  else if (32 == e) r = 5
  else {
    if (4 != e) return void this.fromRadix(t, e)
    r = 2
  }
  ;(this.t = 0), (this.s = 0)
  for (var n = t.length, o = !1, i = 0; 0 <= --n; ) {
    var s = 8 == r ? 255 & t[n] : intAt(t, n)
    s < 0
      ? '-' == t.charAt(n) && (o = !0)
      : ((o = !1),
        0 == i
          ? (this[this.t++] = s)
          : i + r > this.DB
          ? ((this[this.t - 1] |= (s & ((1 << (this.DB - i)) - 1)) << i),
            (this[this.t++] = s >> (this.DB - i)))
          : (this[this.t - 1] |= s << i),
        (i += r) >= this.DB && (i -= this.DB))
  }
  8 == r &&
    0 != (128 & t[0]) &&
    ((this.s = -1),
    0 < i && (this[this.t - 1] |= ((1 << (this.DB - i)) - 1) << i)),
    this.clamp(),
    o && BigInteger.ZERO.subTo(this, this)
}
function bnpClamp() {
  for (var t = this.s & this.DM; 0 < this.t && this[this.t - 1] == t; ) --this.t
}
function bnToString(t) {
  if (this.s < 0) return '-' + this.negate().toString(t)
  var e
  if (16 == t) e = 4
  else if (8 == t) e = 3
  else if (2 == t) e = 1
  else if (32 == t) e = 5
  else {
    if (4 != t) return this.toRadix(t)
    e = 2
  }
  var r,
    n = (1 << e) - 1,
    o = !1,
    i = '',
    s = this.t,
    a = this.DB - ((s * this.DB) % e)
  if (0 < s--)
    for (
      a < this.DB && 0 < (r = this[s] >> a) && ((o = !0), (i = int2char(r)));
      0 <= s;

    )
      a < e
        ? ((r = (this[s] & ((1 << a) - 1)) << (e - a)),
          (r |= this[--s] >> (a += this.DB - e)))
        : ((r = (this[s] >> (a -= e)) & n), a <= 0 && ((a += this.DB), --s)),
        (o = 0 < r ? !0 : o) && (i += int2char(r))
  return o ? i : '0'
}
function bnNegate() {
  var t = nbi()
  return BigInteger.ZERO.subTo(this, t), t
}
function bnAbs() {
  return this.s < 0 ? this.negate() : this
}
function bnCompareTo(t) {
  var e = this.s - t.s
  if (0 != e) return e
  var r = this.t
  if (0 != (e = r - t.t)) return this.s < 0 ? -e : e
  for (; 0 <= --r; ) if (0 != (e = this[r] - t[r])) return e
  return 0
}
function nbits(t) {
  var e,
    r = 1
  return (
    0 != (e = t >>> 16) && ((t = e), (r += 16)),
    0 != (e = t >> 8) && ((t = e), (r += 8)),
    0 != (e = t >> 4) && ((t = e), (r += 4)),
    0 != (e = t >> 2) && ((t = e), (r += 2)),
    0 != (e = t >> 1) && ((t = e), (r += 1)),
    r
  )
}
function bnBitLength() {
  return this.t <= 0
    ? 0
    : this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ (this.s & this.DM))
}
function bnpDLShiftTo(t, e) {
  for (var r = this.t - 1; 0 <= r; --r) e[r + t] = this[r]
  for (r = t - 1; 0 <= r; --r) e[r] = 0
  ;(e.t = this.t + t), (e.s = this.s)
}
function bnpDRShiftTo(t, e) {
  for (var r = t; r < this.t; ++r) e[r - t] = this[r]
  ;(e.t = Math.max(this.t - t, 0)), (e.s = this.s)
}
function bnpLShiftTo(t, e) {
  for (
    var r = t % this.DB,
      n = this.DB - r,
      o = (1 << n) - 1,
      i = Math.floor(t / this.DB),
      s = (this.s << r) & this.DM,
      a = this.t - 1;
    0 <= a;
    --a
  )
    (e[a + i + 1] = (this[a] >> n) | s), (s = (this[a] & o) << r)
  for (a = i - 1; 0 <= a; --a) e[a] = 0
  ;(e[i] = s), (e.t = this.t + i + 1), (e.s = this.s), e.clamp()
}
function bnpRShiftTo(t, e) {
  e.s = this.s
  var r = Math.floor(t / this.DB)
  if (r >= this.t) e.t = 0
  else {
    var n = t % this.DB,
      o = this.DB - n,
      i = (1 << n) - 1
    e[0] = this[r] >> n
    for (var s = r + 1; s < this.t; ++s)
      (e[s - r - 1] |= (this[s] & i) << o), (e[s - r] = this[s] >> n)
    0 < n && (e[this.t - r - 1] |= (this.s & i) << o),
      (e.t = this.t - r),
      e.clamp()
  }
}
function bnpSubTo(t, e) {
  for (var r = 0, n = 0, o = Math.min(t.t, this.t); r < o; )
    (n += this[r] - t[r]), (e[r++] = n & this.DM), (n >>= this.DB)
  if (t.t < this.t) {
    for (n -= t.s; r < this.t; )
      (n += this[r]), (e[r++] = n & this.DM), (n >>= this.DB)
    n += this.s
  } else {
    for (n += this.s; r < t.t; )
      (n -= t[r]), (e[r++] = n & this.DM), (n >>= this.DB)
    n -= t.s
  }
  ;(e.s = n < 0 ? -1 : 0),
    n < -1 ? (e[r++] = this.DV + n) : 0 < n && (e[r++] = n),
    (e.t = r),
    e.clamp()
}
function bnpMultiplyTo(t, e) {
  var r = this.abs(),
    n = t.abs(),
    o = r.t
  for (e.t = o + n.t; 0 <= --o; ) e[o] = 0
  for (o = 0; o < n.t; ++o) e[o + r.t] = r.am(0, n[o], e, o, 0, r.t)
  ;(e.s = 0), e.clamp(), this.s != t.s && BigInteger.ZERO.subTo(e, e)
}
function bnpSquareTo(t) {
  for (var e = this.abs(), r = (t.t = 2 * e.t); 0 <= --r; ) t[r] = 0
  for (r = 0; r < e.t - 1; ++r) {
    var n = e.am(r, e[r], t, 2 * r, 0, 1)
    ;(t[r + e.t] += e.am(r + 1, 2 * e[r], t, 2 * r + 1, n, e.t - r - 1)) >=
      e.DV && ((t[r + e.t] -= e.DV), (t[r + e.t + 1] = 1))
  }
  0 < t.t && (t[t.t - 1] += e.am(r, e[r], t, 2 * r, 0, 1)), (t.s = 0), t.clamp()
}
function bnpDivRemTo(t, e, r) {
  var n = t.abs()
  if (!(n.t <= 0)) {
    var o = this.abs()
    if (o.t < n.t)
      return null != e && e.fromInt(0), void (null != r && this.copyTo(r))
    null == r && (r = nbi())
    var i = nbi(),
      s = this.s,
      a = t.s,
      t = this.DB - nbits(n[n.t - 1])
    0 < t ? (n.lShiftTo(t, i), o.lShiftTo(t, r)) : (n.copyTo(i), o.copyTo(r))
    var u = i.t,
      c = i[u - 1]
    if (0 != c) {
      var o = c * (1 << this.F1) + (1 < u ? i[u - 2] >> this.F2 : 0),
        l = this.FV / o,
        p = (1 << this.F1) / o,
        f = 1 << this.F2,
        h = r.t,
        d = h - u,
        y = null == e ? nbi() : e
      for (
        i.dlShiftTo(d, y),
          0 <= r.compareTo(y) && ((r[r.t++] = 1), r.subTo(y, r)),
          BigInteger.ONE.dlShiftTo(u, y),
          y.subTo(i, i);
        i.t < u;

      )
        i[i.t++] = 0
      for (; 0 <= --d; ) {
        var m =
          r[--h] == c ? this.DM : Math.floor(r[h] * l + (r[h - 1] + f) * p)
        if ((r[h] += i.am(0, m, r, d, 0, u)) < m)
          for (i.dlShiftTo(d, y), r.subTo(y, r); r[h] < --m; ) r.subTo(y, r)
      }
      null != e && (r.drShiftTo(u, e), s != a && BigInteger.ZERO.subTo(e, e)),
        (r.t = u),
        r.clamp(),
        0 < t && r.rShiftTo(t, r),
        s < 0 && BigInteger.ZERO.subTo(r, r)
    }
  }
}
function bnMod(t) {
  var e = nbi()
  return (
    this.abs().divRemTo(t, null, e),
    this.s < 0 && 0 < e.compareTo(BigInteger.ZERO) && t.subTo(e, e),
    e
  )
}
function Classic(t) {
  this.m = t
}
function cConvert(t) {
  return t.s < 0 || 0 <= t.compareTo(this.m) ? t.mod(this.m) : t
}
function cRevert(t) {
  return t
}
function cReduce(t) {
  t.divRemTo(this.m, null, t)
}
function cMulTo(t, e, r) {
  t.multiplyTo(e, r), this.reduce(r)
}
function cSqrTo(t, e) {
  t.squareTo(e), this.reduce(e)
}
function bnpInvDigit() {
  if (this.t < 1) return 0
  var t = this[0]
  if (0 == (1 & t)) return 0
  var e = 3 & t
  return 0 <
    (e =
      ((e =
        ((e =
          ((e = (e * (2 - (15 & t) * e)) & 15) * (2 - (255 & t) * e)) & 255) *
          (2 - (((65535 & t) * e) & 65535))) &
        65535) *
        (2 - ((t * e) % this.DV))) %
      this.DV)
    ? this.DV - e
    : -e
}
function Montgomery(t) {
  ;(this.m = t),
    (this.mp = t.invDigit()),
    (this.mpl = 32767 & this.mp),
    (this.mph = this.mp >> 15),
    (this.um = (1 << (t.DB - 15)) - 1),
    (this.mt2 = 2 * t.t)
}
function montConvert(t) {
  var e = nbi()
  return (
    t.abs().dlShiftTo(this.m.t, e),
    e.divRemTo(this.m, null, e),
    t.s < 0 && 0 < e.compareTo(BigInteger.ZERO) && this.m.subTo(e, e),
    e
  )
}
function montRevert(t) {
  var e = nbi()
  return t.copyTo(e), this.reduce(e), e
}
function montReduce(t) {
  for (; t.t <= this.mt2; ) t[t.t++] = 0
  for (var e = 0; e < this.m.t; ++e) {
    var r = 32767 & t[e],
      n =
        (r * this.mpl +
          (((r * this.mph + (t[e] >> 15) * this.mpl) & this.um) << 15)) &
        t.DM
    for (
      t[(r = e + this.m.t)] += this.m.am(0, n, t, e, 0, this.m.t);
      t[r] >= t.DV;

    )
      (t[r] -= t.DV), t[++r]++
  }
  t.clamp(),
    t.drShiftTo(this.m.t, t),
    0 <= t.compareTo(this.m) && t.subTo(this.m, t)
}
function montSqrTo(t, e) {
  t.squareTo(e), this.reduce(e)
}
function montMulTo(t, e, r) {
  t.multiplyTo(e, r), this.reduce(r)
}
function bnpIsEven() {
  return 0 == (0 < this.t ? 1 & this[0] : this.s)
}
function bnpExp(t, e) {
  if (4294967295 < t || t < 1) return BigInteger.ONE
  var r,
    n = nbi(),
    o = nbi(),
    i = e.convert(this),
    s = nbits(t) - 1
  for (i.copyTo(n); 0 <= --s; )
    e.sqrTo(n, o),
      0 < (t & (1 << s)) ? e.mulTo(o, i, n) : ((r = n), (n = o), (o = r))
  return e.revert(n)
}
function bnModPowInt(t, e) {
  e = new (t < 256 || e.isEven() ? Classic : Montgomery)(e)
  return this.exp(t, e)
}
function Arcfour() {
  ;(this.i = 0), (this.j = 0), (this.S = new Array())
}
function ARC4init(t) {
  for (var e, r, n = 0; n < 256; ++n) this.S[n] = n
  for (n = e = 0; n < 256; ++n)
    (e = (e + this.S[n] + t[n % t.length]) & 255),
      (r = this.S[n]),
      (this.S[n] = this.S[e]),
      (this.S[e] = r)
  ;(this.i = 0), (this.j = 0)
}
function ARC4next() {
  var t
  return (
    (this.i = (this.i + 1) & 255),
    (this.j = (this.j + this.S[this.i]) & 255),
    (t = this.S[this.i]),
    (this.S[this.i] = this.S[this.j]),
    (this.S[this.j] = t),
    this.S[(t + this.S[this.i]) & 255]
  )
}
function prng_newstate() {
  return new Arcfour()
}
;(Classic.prototype.convert = cConvert),
  (Classic.prototype.revert = cRevert),
  (Classic.prototype.reduce = cReduce),
  (Classic.prototype.mulTo = cMulTo),
  (Classic.prototype.sqrTo = cSqrTo),
  (Montgomery.prototype.convert = montConvert),
  (Montgomery.prototype.revert = montRevert),
  (Montgomery.prototype.reduce = montReduce),
  (Montgomery.prototype.mulTo = montMulTo),
  (Montgomery.prototype.sqrTo = montSqrTo),
  (BigInteger.prototype.copyTo = bnpCopyTo),
  (BigInteger.prototype.fromInt = bnpFromInt),
  (BigInteger.prototype.fromString = bnpFromString),
  (BigInteger.prototype.clamp = bnpClamp),
  (BigInteger.prototype.dlShiftTo = bnpDLShiftTo),
  (BigInteger.prototype.drShiftTo = bnpDRShiftTo),
  (BigInteger.prototype.lShiftTo = bnpLShiftTo),
  (BigInteger.prototype.rShiftTo = bnpRShiftTo),
  (BigInteger.prototype.subTo = bnpSubTo),
  (BigInteger.prototype.multiplyTo = bnpMultiplyTo),
  (BigInteger.prototype.squareTo = bnpSquareTo),
  (BigInteger.prototype.divRemTo = bnpDivRemTo),
  (BigInteger.prototype.invDigit = bnpInvDigit),
  (BigInteger.prototype.isEven = bnpIsEven),
  (BigInteger.prototype.exp = bnpExp),
  (BigInteger.prototype.toString = bnToString),
  (BigInteger.prototype.negate = bnNegate),
  (BigInteger.prototype.abs = bnAbs),
  (BigInteger.prototype.compareTo = bnCompareTo),
  (BigInteger.prototype.bitLength = bnBitLength),
  (BigInteger.prototype.mod = bnMod),
  (BigInteger.prototype.modPowInt = bnModPowInt),
  (BigInteger.ZERO = nbv(0)),
  (BigInteger.ONE = nbv(1)),
  (Arcfour.prototype.init = ARC4init),
  (Arcfour.prototype.next = ARC4next)
var rng_state,
  rng_psize = 256
function rng_seed_int(t) {
  ;(rng_pool[rng_pptr++] ^= 255 & t),
    (rng_pool[rng_pptr++] ^= (t >> 8) & 255),
    (rng_pool[rng_pptr++] ^= (t >> 16) & 255),
    (rng_pool[rng_pptr++] ^= (t >> 24) & 255),
    rng_psize <= rng_pptr && (rng_pptr -= rng_psize)
}
function rng_seed_time() {
  rng_seed_int(new Date().getTime())
}
if (null == rng_pool) {
  var rng_pool = new Array(),
    rng_pptr = 0
  if (window.crypto && window.crypto.getRandomValues) {
    var ua = new Uint8Array(32)
    for (window.crypto.getRandomValues(ua), t = 0; t < 32; ++t)
      rng_pool[rng_pptr++] = ua[t]
  }
  if (
    'Netscape' == navigator.appName &&
    navigator.appVersion < '5' &&
    window.crypto
  )
    for (var z = window.crypto.random(32), t = 0; t < z.length; ++t)
      rng_pool[rng_pptr++] = 255 & z.charCodeAt(t)
  for (; rng_pptr < rng_psize; )
    (t = Math.floor(65536 * Math.random())),
      (rng_pool[rng_pptr++] = t >>> 8),
      (rng_pool[rng_pptr++] = 255 & t)
  ;(rng_pptr = 0), rng_seed_time()
}
function rng_get_byte() {
  if (null == rng_state) {
    for (
      rng_seed_time(),
        (rng_state = prng_newstate()).init(rng_pool),
        rng_pptr = 0;
      rng_pptr < rng_pool.length;
      ++rng_pptr
    )
      rng_pool[rng_pptr] = 0
    rng_pptr = 0
  }
  return rng_state.next()
}
function rng_get_bytes(t) {
  for (var e = 0; e < t.length; ++e) t[e] = rng_get_byte()
}
function SecureRandom() {}
function parseBigInt(t, e) {
  return new BigInteger(t, e)
}
function linebrk(t, e) {
  for (var r = '', n = 0; n + e < t.length; )
    (r += t.substring(n, n + e) + '\n'), (n += e)
  return r + t.substring(n, t.length)
}
function byte2Hex(t) {
  return t < 16 ? '0' + t.toString(16) : t.toString(16)
}
function pkcs1pad2(t, e) {
  if (e < t.length + 11) return alert('Message too long for RSA'), null
  for (var r = new Array(), n = t.length - 1; 0 <= n && 0 < e; ) {
    var o = t.charCodeAt(n--)
    o < 128
      ? (r[--e] = o)
      : 127 < o && o < 2048
      ? ((r[--e] = (63 & o) | 128), (r[--e] = (o >> 6) | 192))
      : ((r[--e] = (63 & o) | 128),
        (r[--e] = ((o >> 6) & 63) | 128),
        (r[--e] = (o >> 12) | 224))
  }
  r[--e] = 0
  for (var i = new SecureRandom(), s = new Array(); 2 < e; ) {
    for (s[0] = 0; 0 == s[0]; ) i.nextBytes(s)
    r[--e] = s[0]
  }
  return (r[--e] = 2), (r[--e] = 0), new BigInteger(r)
}
function RSAKey() {
  ;(this.n = null),
    (this.e = 0),
    (this.d = null),
    (this.p = null),
    (this.q = null),
    (this.dmp1 = null),
    (this.dmq1 = null),
    (this.coeff = null)
}
function RSASetPublic(t, e) {
  null != t && null != e && 0 < t.length && 0 < e.length
    ? ((this.n = parseBigInt(t, 16)), (this.e = parseInt(e, 16)))
    : alert('Invalid RSA public key')
}
function RSADoPublic(t) {
  return t.modPowInt(this.e, this.n)
}
function RSAEncrypt(t) {
  t = pkcs1pad2(t, (this.n.bitLength() + 7) >> 3)
  if (null == t) return null
  t = this.doPublic(t)
  if (null == t) return null
  t = t.toString(16)
  return 0 == (1 & t.length) ? t : '0' + t
}
;(SecureRandom.prototype.nextBytes = rng_get_bytes),
  (RSAKey.prototype.doPublic = RSADoPublic),
  (RSAKey.prototype.setPublic = RSASetPublic),
  (RSAKey.prototype.encrypt = RSAEncrypt)
var b64map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
  b64padchar = '='
function hex2b64(t) {
  for (var e, r = '', n = 0; n + 3 <= t.length; n += 3)
    (e = parseInt(t.substring(n, n + 3), 16)),
      (r += b64map.charAt(e >> 6) + b64map.charAt(63 & e))
  for (
    n + 1 == t.length
      ? ((e = parseInt(t.substring(n, n + 1), 16)),
        (r += b64map.charAt(e << 2)))
      : n + 2 == t.length &&
        ((e = parseInt(t.substring(n, n + 2), 16)),
        (r += b64map.charAt(e >> 2) + b64map.charAt((3 & e) << 4)));
    0 < (3 & r.length);

  )
    r += b64padchar
  return r
}
function b64tohex(t) {
  for (
    var e, r = '', n = 0, o = 0;
    o < t.length && t.charAt(o) != b64padchar;
    ++o
  )
    (v = b64map.indexOf(t.charAt(o))),
      v < 0 ||
        (n =
          0 == n
            ? ((r += int2char(v >> 2)), (e = 3 & v), 1)
            : 1 == n
            ? ((r += int2char((e << 2) | (v >> 4))), (e = 15 & v), 2)
            : 2 == n
            ? ((r += int2char(e)), (r += int2char(v >> 2)), (e = 3 & v), 3)
            : ((r += int2char((e << 2) | (v >> 4))),
              (r += int2char(15 & v)),
              0))
  return 1 == n && (r += int2char(e << 2)), r
}

;(function () {
  return (function n(o, i, s) {
    function a(e, t) {
      if (!i[e]) {
        if (!o[e]) {
          var r = 'function' == typeof require && require
          if (!t && r) return r(e, !0)
          if (u) return u(e, !0)
          throw (
            (((r = new Error("Cannot find module '" + e + "'")).code =
              'MODULE_NOT_FOUND'),
            r)
          )
        }
        ;(r = i[e] = { exports: {} }),
          o[e][0].call(
            r.exports,
            function (t) {
              return a(o[e][1][t] || t)
            },
            r,
            r.exports,
            n,
            o,
            i,
            s
          )
      }
      return i[e].exports
    }
    for (
      var u = 'function' == typeof require && require, t = 0;
      t < s.length;
      t++
    )
      a(s[t])
    return a
  })(
    {
      1: [
        function (t, e, r) {
          'use strict'
          function n(t) {
            if (t)
              return (function (t) {
                for (var e in n.prototype) t[e] = n.prototype[e]
                return t
              })(t)
          }
          void 0 !== e && (e.exports = n),
            (n.prototype.on = n.prototype.addEventListener =
              function (t, e) {
                return (
                  (this._callbacks = this._callbacks || {}),
                  (this._callbacks['$' + t] =
                    this._callbacks['$' + t] || []).push(e),
                  this
                )
              }),
            (n.prototype.once = function (t, e) {
              function r() {
                this.off(t, r), e.apply(this, arguments)
              }
              return (r.fn = e), this.on(t, r), this
            }),
            (n.prototype.off =
              n.prototype.removeListener =
              n.prototype.removeAllListeners =
              n.prototype.removeEventListener =
                function (t, e) {
                  if (
                    ((this._callbacks = this._callbacks || {}),
                    0 == arguments.length)
                  )
                    return (this._callbacks = {}), this
                  var r,
                    n = this._callbacks['$' + t]
                  if (!n) return this
                  if (1 == arguments.length)
                    return delete this._callbacks['$' + t], this
                  for (var o = 0; o < n.length; o++)
                    if ((r = n[o]) === e || r.fn === e) {
                      n.splice(o, 1)
                      break
                    }
                  return 0 === n.length && delete this._callbacks['$' + t], this
                }),
            (n.prototype.emit = function (t) {
              this._callbacks = this._callbacks || {}
              for (
                var e = new Array(arguments.length - 1),
                  r = this._callbacks['$' + t],
                  n = 1;
                n < arguments.length;
                n++
              )
                e[n - 1] = arguments[n]
              if (r)
                for (var n = 0, o = (r = r.slice(0)).length; n < o; ++n)
                  r[n].apply(this, e)
              return this
            }),
            (n.prototype.listeners = function (t) {
              return (
                (this._callbacks = this._callbacks || {}),
                this._callbacks['$' + t] || []
              )
            }),
            (n.prototype.hasListeners = function (t) {
              return !!this.listeners(t).length
            })
        },
        {},
      ],
      2: [
        function (t, e, r) {
          'use strict'
          function l(t) {
            return (l =
              'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (t) {
                    return typeof t
                  }
                : function (t) {
                    return t &&
                      'function' == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? 'symbol'
                      : typeof t
                  })(t)
          }
          ;(((e.exports = n).default = n).stable = o), (n.stableStringify = o)
          var p = [],
            f = []
          function n(t, e, r) {
            for (
              !(function t(e, r, n, o) {
                var i
                if ('object' === l(e) && null !== e) {
                  for (i = 0; i < n.length; i++)
                    if (n[i] === e) {
                      var s = Object.getOwnPropertyDescriptor(o, r)
                      return void (void 0 !== s.get
                        ? s.configurable
                          ? (Object.defineProperty(o, r, {
                              value: '[Circular]',
                            }),
                            p.push([o, r, e, s]))
                          : f.push([e, r])
                        : ((o[r] = '[Circular]'), p.push([o, r, e])))
                    }
                  if ((n.push(e), Array.isArray(e)))
                    for (i = 0; i < e.length; i++) t(e[i], i, n, e)
                  else {
                    var a = Object.keys(e)
                    for (i = 0; i < a.length; i++) {
                      var u = a[i]
                      t(e[u], u, n, e)
                    }
                  }
                  n.pop()
                }
              })(t, '', [], void 0),
                r =
                  0 === f.length
                    ? JSON.stringify(t, e, r)
                    : JSON.stringify(t, i(e), r);
              0 !== p.length;

            ) {
              var n = p.pop()
              4 === n.length
                ? Object.defineProperty(n[0], n[1], n[3])
                : (n[0][n[1]] = n[2])
            }
            return r
          }
          function h(t, e) {
            return t < e ? -1 : e < t ? 1 : 0
          }
          function o(t, e, r) {
            for (
              t =
                (function t(e, r, n, o) {
                  var i
                  if ('object' === l(e) && null !== e) {
                    for (i = 0; i < n.length; i++)
                      if (n[i] === e) {
                        var s = Object.getOwnPropertyDescriptor(o, r)
                        return void (void 0 !== s.get
                          ? s.configurable
                            ? (Object.defineProperty(o, r, {
                                value: '[Circular]',
                              }),
                              p.push([o, r, e, s]))
                            : f.push([e, r])
                          : ((o[r] = '[Circular]'), p.push([o, r, e])))
                      }
                    if ('function' != typeof e.toJSON) {
                      if ((n.push(e), Array.isArray(e)))
                        for (i = 0; i < e.length; i++) t(e[i], i, n, e)
                      else {
                        var a = {},
                          u = Object.keys(e).sort(h)
                        for (i = 0; i < u.length; i++) {
                          var c = u[i]
                          t(e[c], c, n, e), (a[c] = e[c])
                        }
                        if (void 0 === o) return a
                        p.push([o, r, e]), (o[r] = a)
                      }
                      n.pop()
                    }
                  }
                })(t, '', [], void 0) || t,
                r =
                  0 === f.length
                    ? JSON.stringify(t, e, r)
                    : JSON.stringify(t, i(e), r);
              0 !== p.length;

            ) {
              var n = p.pop()
              4 === n.length
                ? Object.defineProperty(n[0], n[1], n[3])
                : (n[0][n[1]] = n[2])
            }
            return r
          }
          function i(o) {
            return (
              (o =
                void 0 !== o
                  ? o
                  : function (t, e) {
                      return e
                    }),
              function (t, e) {
                if (0 < f.length)
                  for (var r = 0; r < f.length; r++) {
                    var n = f[r]
                    if (n[1] === t && n[0] === e) {
                      ;(e = '[Circular]'), f.splice(r, 1)
                      break
                    }
                  }
                return o.call(this, t, e)
              }
            )
          }
        },
        {},
      ],
      3: [
        function (t, e, r) {
          'use strict'
          var n = String.prototype.replace,
            o = /%20/g,
            i = t('./utils'),
            t = { RFC1738: 'RFC1738', RFC3986: 'RFC3986' }
          e.exports = i.assign(
            {
              default: t.RFC3986,
              formatters: {
                RFC1738: function (t) {
                  return n.call(t, o, '+')
                },
                RFC3986: function (t) {
                  return String(t)
                },
              },
            },
            t
          )
        },
        { './utils': 7 },
      ],
      4: [
        function (t, e, r) {
          'use strict'
          var n = t('./stringify'),
            o = t('./parse'),
            t = t('./formats')
          e.exports = { formats: t, parse: o, stringify: n }
        },
        { './formats': 3, './parse': 5, './stringify': 6 },
      ],
      5: [
        function (t, e, r) {
          'use strict'
          function p(t, e) {
            return t && 'string' == typeof t && e.comma && -1 < t.indexOf(',')
              ? t.split(',')
              : t
          }
          function u(t, e) {
            var r,
              n,
              o,
              i,
              s = {},
              a = e.ignoreQueryPrefix ? t.replace(/^\?/, '') : t,
              t = e.parameterLimit === 1 / 0 ? void 0 : e.parameterLimit,
              u = a.split(e.delimiter, t),
              c = -1,
              l = e.charset
            if (e.charsetSentinel)
              for (r = 0; r < u.length; ++r)
                0 === u[r].indexOf('utf8=') &&
                  ('utf8=%E2%9C%93' === u[r]
                    ? (l = 'utf-8')
                    : 'utf8=%26%2310003%3B' === u[r] && (l = 'iso-8859-1'),
                  (c = r),
                  (r = u.length))
            for (r = 0; r < u.length; ++r)
              r !== c &&
                ((i =
                  -1 ===
                  (i =
                    -1 === (i = (n = u[r]).indexOf(']='))
                      ? n.indexOf('=')
                      : i + 1)
                    ? ((o = e.decoder(n, y.decoder, l, 'key')),
                      e.strictNullHandling ? null : '')
                    : ((o = e.decoder(n.slice(0, i), y.decoder, l, 'key')),
                      f.maybeMap(p(n.slice(i + 1), e), function (t) {
                        return e.decoder(t, y.decoder, l, 'value')
                      }))) &&
                  e.interpretNumericEntities &&
                  'iso-8859-1' === l &&
                  (i = i.replace(/&#(\d+);/g, function (t, e) {
                    return String.fromCharCode(parseInt(e, 10))
                  })),
                -1 < n.indexOf('[]=') && (i = d(i) ? [i] : i),
                h.call(s, o) ? (s[o] = f.combine(s[o], i)) : (s[o] = i))
            return s
          }
          function c(t, e, r, n) {
            if (t) {
              var o = r.allowDots ? t.replace(/\.([^.[]+)/g, '[$1]') : t,
                i = /(\[[^[\]]*])/g,
                s = 0 < r.depth && /(\[[^[\]]*])/.exec(o),
                t = s ? o.slice(0, s.index) : o,
                a = []
              if (t) {
                if (
                  !r.plainObjects &&
                  h.call(Object.prototype, t) &&
                  !r.allowPrototypes
                )
                  return
                a.push(t)
              }
              for (
                var u = 0;
                0 < r.depth && null !== (s = i.exec(o)) && u < r.depth;

              ) {
                if (
                  ((u += 1),
                  !r.plainObjects &&
                    h.call(Object.prototype, s[1].slice(1, -1)) &&
                    !r.allowPrototypes)
                )
                  return
                a.push(s[1])
              }
              return (
                s && a.push('[' + o.slice(s.index) + ']'),
                (function (t, e, r, n) {
                  for (var o = n ? e : p(e, r), i = t.length - 1; 0 <= i; --i) {
                    var s,
                      a,
                      u,
                      c = t[i]
                    '[]' === c && r.parseArrays
                      ? (s = [].concat(o))
                      : ((s = r.plainObjects ? Object.create(null) : {}),
                        (a =
                          '[' === c.charAt(0) && ']' === c.charAt(c.length - 1)
                            ? c.slice(1, -1)
                            : c),
                        (u = parseInt(a, 10)),
                        r.parseArrays || '' !== a
                          ? !isNaN(u) &&
                            c !== a &&
                            String(u) === a &&
                            0 <= u &&
                            r.parseArrays &&
                            u <= r.arrayLimit
                            ? ((s = [])[u] = o)
                            : (s[a] = o)
                          : (s = { 0: o })),
                      (o = s)
                  }
                  return o
                })(a, e, r, n)
              )
            }
          }
          var f = t('./utils'),
            h = Object.prototype.hasOwnProperty,
            d = Array.isArray,
            y = {
              allowDots: !1,
              allowPrototypes: !1,
              arrayLimit: 20,
              charset: 'utf-8',
              charsetSentinel: !1,
              comma: !1,
              decoder: f.decode,
              delimiter: '&',
              depth: 5,
              ignoreQueryPrefix: !1,
              interpretNumericEntities: !1,
              parameterLimit: 1e3,
              parseArrays: !0,
              plainObjects: !1,
              strictNullHandling: !1,
            }
          e.exports = function (t, e) {
            var r = (function (t) {
              if (!t) return y
              if (
                null !== t.decoder &&
                void 0 !== t.decoder &&
                'function' != typeof t.decoder
              )
                throw new TypeError('Decoder has to be a function.')
              if (
                void 0 !== t.charset &&
                'utf-8' !== t.charset &&
                'iso-8859-1' !== t.charset
              )
                throw new TypeError(
                  'The charset option must be either utf-8, iso-8859-1, or undefined'
                )
              var e = (void 0 === t.charset ? y : t).charset
              return {
                allowDots: void 0 === t.allowDots ? y.allowDots : !!t.allowDots,
                allowPrototypes: ('boolean' == typeof t.allowPrototypes ? t : y)
                  .allowPrototypes,
                arrayLimit: ('number' == typeof t.arrayLimit ? t : y)
                  .arrayLimit,
                charset: e,
                charsetSentinel: ('boolean' == typeof t.charsetSentinel ? t : y)
                  .charsetSentinel,
                comma: ('boolean' == typeof t.comma ? t : y).comma,
                decoder: ('function' == typeof t.decoder ? t : y).decoder,
                delimiter: ('string' == typeof t.delimiter ||
                f.isRegExp(t.delimiter)
                  ? t
                  : y
                ).delimiter,
                depth:
                  'number' == typeof t.depth || !1 === t.depth
                    ? +t.depth
                    : y.depth,
                ignoreQueryPrefix: !0 === t.ignoreQueryPrefix,
                interpretNumericEntities: ('boolean' ==
                typeof t.interpretNumericEntities
                  ? t
                  : y
                ).interpretNumericEntities,
                parameterLimit: ('number' == typeof t.parameterLimit ? t : y)
                  .parameterLimit,
                parseArrays: !1 !== t.parseArrays,
                plainObjects: ('boolean' == typeof t.plainObjects ? t : y)
                  .plainObjects,
                strictNullHandling: ('boolean' == typeof t.strictNullHandling
                  ? t
                  : y
                ).strictNullHandling,
              }
            })(e)
            if ('' === t || null == t)
              return r.plainObjects ? Object.create(null) : {}
            for (
              var n = 'string' == typeof t ? u(t, r) : t,
                o = r.plainObjects ? Object.create(null) : {},
                i = Object.keys(n),
                s = 0;
              s < i.length;
              ++s
            )
              var a = i[s],
                a = c(a, n[a], r, 'string' == typeof t),
                o = f.merge(o, a, r)
            return f.compact(o)
          }
        },
        { './utils': 7 },
      ],
      6: [
        function (t, e, r) {
          'use strict'
          function v(t) {
            return (v =
              'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (t) {
                    return typeof t
                  }
                : function (t) {
                    return t &&
                      'function' == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? 'symbol'
                      : typeof t
                  })(t)
          }
          function T(t, e) {
            n.apply(t, w(e) ? e : [e])
          }
          function _(t, e, r, n, o, i, s, a, u, c, l, p, f) {
            var h = t
            if (
              ('function' == typeof s
                ? (h = s(e, h))
                : h instanceof Date
                ? (h = c(h))
                : 'comma' === r &&
                  w(h) &&
                  (h = S.maybeMap(h, function (t) {
                    return t instanceof Date ? c(t) : t
                  }).join(',')),
              null === h)
            ) {
              if (n) return i && !p ? i(e, D.encoder, f, 'key') : e
              h = ''
            }
            if (
              ((t = h),
              'string' == typeof t ||
                'number' == typeof t ||
                'boolean' == typeof t ||
                'symbol' === v(t) ||
                'bigint' == typeof t ||
                S.isBuffer(h))
            )
              return i
                ? [
                    l(p ? e : i(e, D.encoder, f, 'key')) +
                      '=' +
                      l(i(h, D.encoder, f, 'value')),
                  ]
                : [l(e) + '=' + l(String(h))]
            var d,
              y = []
            if (void 0 === h) return y
            d = w(s) ? s : ((t = Object.keys(h)), a ? t.sort(a) : t)
            for (var m = 0; m < d.length; ++m) {
              var g = d[m],
                b = h[g]
              ;(o && null === b) ||
                ((g = w(h)
                  ? 'function' == typeof r
                    ? r(e, g)
                    : e
                  : e + (u ? '.' + g : '[' + g + ']')),
                T(y, _(b, g, r, n, o, i, s, a, u, c, l, p, f)))
            }
            return y
          }
          var S = t('./utils'),
            c = t('./formats'),
            l = Object.prototype.hasOwnProperty,
            p = {
              brackets: function (t) {
                return t + '[]'
              },
              comma: 'comma',
              indices: function (t, e) {
                return t + '[' + e + ']'
              },
              repeat: function (t) {
                return t
              },
            },
            w = Array.isArray,
            n = Array.prototype.push,
            o = Date.prototype.toISOString,
            t = c.default,
            D = {
              addQueryPrefix: !1,
              allowDots: !1,
              charset: 'utf-8',
              charsetSentinel: !1,
              delimiter: '&',
              encode: !0,
              encoder: S.encode,
              encodeValuesOnly: !1,
              format: t,
              formatter: c.formatters[t],
              indices: !1,
              serializeDate: function (t) {
                return o.call(t)
              },
              skipNulls: !1,
              strictNullHandling: !1,
            }
          e.exports = function (t, e) {
            var r = t,
              n = (function (t) {
                if (!t) return D
                if (
                  null !== t.encoder &&
                  void 0 !== t.encoder &&
                  'function' != typeof t.encoder
                )
                  throw new TypeError('Encoder has to be a function.')
                var e = t.charset || D.charset
                if (
                  void 0 !== t.charset &&
                  'utf-8' !== t.charset &&
                  'iso-8859-1' !== t.charset
                )
                  throw new TypeError(
                    'The charset option must be either utf-8, iso-8859-1, or undefined'
                  )
                var r = c.default
                if (void 0 !== t.format) {
                  if (!l.call(c.formatters, t.format))
                    throw new TypeError('Unknown format option provided.')
                  r = t.format
                }
                var n = c.formatters[r],
                  r = D.filter
                return (
                  ('function' != typeof t.filter && !w(t.filter)) ||
                    (r = t.filter),
                  {
                    addQueryPrefix: ('boolean' == typeof t.addQueryPrefix
                      ? t
                      : D
                    ).addQueryPrefix,
                    allowDots:
                      void 0 === t.allowDots ? D.allowDots : !!t.allowDots,
                    charset: e,
                    charsetSentinel: ('boolean' == typeof t.charsetSentinel
                      ? t
                      : D
                    ).charsetSentinel,
                    delimiter: (void 0 === t.delimiter ? D : t).delimiter,
                    encode: ('boolean' == typeof t.encode ? t : D).encode,
                    encoder: ('function' == typeof t.encoder ? t : D).encoder,
                    encodeValuesOnly: ('boolean' == typeof t.encodeValuesOnly
                      ? t
                      : D
                    ).encodeValuesOnly,
                    filter: r,
                    formatter: n,
                    serializeDate: ('function' == typeof t.serializeDate
                      ? t
                      : D
                    ).serializeDate,
                    skipNulls: ('boolean' == typeof t.skipNulls ? t : D)
                      .skipNulls,
                    sort: 'function' == typeof t.sort ? t.sort : null,
                    strictNullHandling: ('boolean' ==
                    typeof t.strictNullHandling
                      ? t
                      : D
                    ).strictNullHandling,
                  }
                )
              })(e)
            'function' == typeof n.filter
              ? (r = (0, n.filter)('', r))
              : w(n.filter) && (s = n.filter)
            var o = []
            if ('object' !== v(r) || null === r) return ''
            t =
              e && e.arrayFormat in p
                ? e.arrayFormat
                : !(e && 'indices' in e) || e.indices
                ? 'indices'
                : 'repeat'
            var i = p[t],
              s = s || Object.keys(r)
            n.sort && s.sort(n.sort)
            for (var a = 0; a < s.length; ++a) {
              var u = s[a]
              ;(n.skipNulls && null === r[u]) ||
                T(
                  o,
                  _(
                    r[u],
                    u,
                    i,
                    n.strictNullHandling,
                    n.skipNulls,
                    n.encode ? n.encoder : null,
                    n.filter,
                    n.sort,
                    n.allowDots,
                    n.serializeDate,
                    n.formatter,
                    n.encodeValuesOnly,
                    n.charset
                  )
                )
            }
            ;(e = o.join(n.delimiter)), (t = !0 === n.addQueryPrefix ? '?' : '')
            return (
              n.charsetSentinel &&
                ('iso-8859-1' === n.charset
                  ? (t += 'utf8=%26%2310003%3B&')
                  : (t += 'utf8=%E2%9C%93&')),
              0 < e.length ? t + e : ''
            )
          }
        },
        { './formats': 3, './utils': 7 },
      ],
      7: [
        function (t, e, r) {
          'use strict'
          function l(t) {
            return (l =
              'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (t) {
                    return typeof t
                  }
                : function (t) {
                    return t &&
                      'function' == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? 'symbol'
                      : typeof t
                  })(t)
          }
          function s(t, e) {
            for (
              var r = e && e.plainObjects ? Object.create(null) : {}, n = 0;
              n < t.length;
              ++n
            )
              void 0 !== t[n] && (r[n] = t[n])
            return r
          }
          function a(n, o, i) {
            if (!o) return n
            if ('object' !== l(o)) {
              if (p(n)) n.push(o)
              else {
                if (!n || 'object' !== l(n)) return [n, o]
                ;((i && (i.plainObjects || i.allowPrototypes)) ||
                  !u.call(Object.prototype, o)) &&
                  (n[o] = !0)
              }
              return n
            }
            if (!n || 'object' !== l(n)) return [n].concat(o)
            var t = n
            return (
              p(n) && !p(o) && (t = s(n, i)),
              p(n) && p(o)
                ? (o.forEach(function (t, e) {
                    var r
                    u.call(n, e)
                      ? (r = n[e]) &&
                        'object' === l(r) &&
                        t &&
                        'object' === l(t)
                        ? (n[e] = a(r, t, i))
                        : n.push(t)
                      : (n[e] = t)
                  }),
                  n)
                : Object.keys(o).reduce(function (t, e) {
                    var r = o[e]
                    return u.call(t, e) ? (t[e] = a(t[e], r, i)) : (t[e] = r), t
                  }, t)
            )
          }
          var u = Object.prototype.hasOwnProperty,
            p = Array.isArray,
            c = (function () {
              for (var t = [], e = 0; e < 256; ++e)
                t.push(
                  '%' + ((e < 16 ? '0' : '') + e.toString(16)).toUpperCase()
                )
              return t
            })()
          e.exports = {
            arrayToObject: s,
            assign: function (t, r) {
              return Object.keys(r).reduce(function (t, e) {
                return (t[e] = r[e]), t
              }, t)
            },
            combine: function (t, e) {
              return [].concat(t, e)
            },
            compact: function (t) {
              for (
                var e = [{ obj: { o: t }, prop: 'o' }], r = [], n = 0;
                n < e.length;
                ++n
              )
                for (
                  var o = e[n], i = o.obj[o.prop], s = Object.keys(i), a = 0;
                  a < s.length;
                  ++a
                ) {
                  var u = s[a],
                    c = i[u]
                  'object' === l(c) &&
                    null !== c &&
                    -1 === r.indexOf(c) &&
                    (e.push({ obj: i, prop: u }), r.push(c))
                }
              return (
                (function (t) {
                  for (; 1 < t.length; ) {
                    var e = t.pop(),
                      r = e.obj[e.prop]
                    if (p(r)) {
                      for (var n = [], o = 0; o < r.length; ++o)
                        void 0 !== r[o] && n.push(r[o])
                      e.obj[e.prop] = n
                    }
                  }
                })(e),
                t
              )
            },
            decode: function (t, e, r) {
              var n = t.replace(/\+/g, ' ')
              if ('iso-8859-1' === r)
                return n.replace(/%[0-9a-f]{2}/gi, unescape)
              try {
                return decodeURIComponent(n)
              } catch (t) {
                return n
              }
            },
            encode: function (t, e, r) {
              if (0 === t.length) return t
              var n = t
              if (
                ('symbol' === l(t)
                  ? (n = Symbol.prototype.toString.call(t))
                  : 'string' != typeof t && (n = String(t)),
                'iso-8859-1' === r)
              )
                return escape(n).replace(/%u[0-9a-f]{4}/gi, function (t) {
                  return '%26%23' + parseInt(t.slice(2), 16) + '%3B'
                })
              for (var o = '', i = 0; i < n.length; ++i) {
                var s = n.charCodeAt(i)
                45 === s ||
                46 === s ||
                95 === s ||
                126 === s ||
                (48 <= s && s <= 57) ||
                (65 <= s && s <= 90) ||
                (97 <= s && s <= 122)
                  ? (o += n.charAt(i))
                  : s < 128
                  ? (o += c[s])
                  : s < 2048
                  ? (o += c[192 | (s >> 6)] + c[128 | (63 & s)])
                  : s < 55296 || 57344 <= s
                  ? (o +=
                      c[224 | (s >> 12)] +
                      c[128 | ((s >> 6) & 63)] +
                      c[128 | (63 & s)])
                  : ((i += 1),
                    (s =
                      65536 + (((1023 & s) << 10) | (1023 & n.charCodeAt(i)))),
                    (o +=
                      c[240 | (s >> 18)] +
                      c[128 | ((s >> 12) & 63)] +
                      c[128 | ((s >> 6) & 63)] +
                      c[128 | (63 & s)]))
              }
              return o
            },
            isBuffer: function (t) {
              return (
                !(!t || 'object' !== l(t)) &&
                !!(
                  t.constructor &&
                  t.constructor.isBuffer &&
                  t.constructor.isBuffer(t)
                )
              )
            },
            isRegExp: function (t) {
              return '[object RegExp]' === Object.prototype.toString.call(t)
            },
            maybeMap: function (t, e) {
              if (p(t)) {
                for (var r = [], n = 0; n < t.length; n += 1) r.push(e(t[n]))
                return r
              }
              return e(t)
            },
            merge: a,
          }
        },
        {},
      ],
      8: [
        function (t, e, r) {
          'use strict'
          function n(t) {
            return (
              (function (t) {
                if (Array.isArray(t)) return o(t)
              })(t) ||
              (function (t) {
                if (
                  'undefined' != typeof Symbol &&
                  Symbol.iterator in Object(t)
                )
                  return Array.from(t)
              })(t) ||
              (function (t, e) {
                if (!t) return
                if ('string' == typeof t) return o(t, e)
                var r = Object.prototype.toString.call(t).slice(8, -1)
                'Object' === r && t.constructor && (r = t.constructor.name)
                if ('Map' === r || 'Set' === r) return Array.from(t)
                if (
                  'Arguments' === r ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                )
                  return o(t, e)
              })(t) ||
              (function () {
                throw new TypeError(
                  'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
                )
              })()
            )
          }
          function o(t, e) {
            ;(null == e || e > t.length) && (e = t.length)
            for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r]
            return n
          }
          function i() {
            this._defaults = []
          }
          ;[
            'use',
            'on',
            'once',
            'set',
            'query',
            'type',
            'accept',
            'auth',
            'withCredentials',
            'sortQuery',
            'retry',
            'ok',
            'redirects',
            'timeout',
            'buffer',
            'serialize',
            'parse',
            'ca',
            'key',
            'pfx',
            'cert',
            'disableTLSCerts',
          ].forEach(function (n) {
            i.prototype[n] = function () {
              for (
                var t = arguments.length, e = new Array(t), r = 0;
                r < t;
                r++
              )
                e[r] = arguments[r]
              return this._defaults.push({ fn: n, args: e }), this
            }
          }),
            (i.prototype._setDefaults = function (e) {
              this._defaults.forEach(function (t) {
                e[t.fn].apply(e, n(t.args))
              })
            }),
            (e.exports = i)
        },
        {},
      ],
      9: [
        function (t, e, r) {
          'use strict'
          function n(t) {
            return (n =
              'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (t) {
                    return typeof t
                  }
                : function (t) {
                    return t &&
                      'function' == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? 'symbol'
                      : typeof t
                  })(t)
          }
          e.exports = function (t) {
            return null !== t && 'object' === n(t)
          }
        },
        {},
      ],
      10: [
        function (t, e, r) {
          'use strict'
          function n(t) {
            return (n =
              'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (t) {
                    return typeof t
                  }
                : function (t) {
                    return t &&
                      'function' == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? 'symbol'
                      : typeof t
                  })(t)
          }
          var o =
              'undefined' != typeof window
                ? window
                : 'undefined' == typeof self
                ? void console.warn(
                    'Using browser-only version of superagent in non-browser environment'
                  )
                : self,
            i = t('component-emitter'),
            s = t('fast-safe-stringify'),
            a = t('qs'),
            u = t('./request-base'),
            c = t('./is-object'),
            l = t('./response-base'),
            p = t('./agent-base')
          function f() {}
          e.exports = function (t, e) {
            return 'function' == typeof e
              ? new r.Request('GET', t).end(e)
              : 1 === arguments.length
              ? new r.Request('GET', t)
              : new r.Request(t, e)
          }
          var h = (r = e.exports)
          ;(r.Request = v),
            (h.getXHR = function () {
              if (
                o.XMLHttpRequest &&
                (!o.location ||
                  'file:' !== o.location.protocol ||
                  !o.ActiveXObject)
              )
                return new XMLHttpRequest()
              try {
                return new ActiveXObject('Microsoft.XMLHTTP')
              } catch (t) {}
              try {
                return new ActiveXObject('Msxml2.XMLHTTP.6.0')
              } catch (t) {}
              try {
                return new ActiveXObject('Msxml2.XMLHTTP.3.0')
              } catch (t) {}
              try {
                return new ActiveXObject('Msxml2.XMLHTTP')
              } catch (t) {}
              throw new Error(
                'Browser-only version of superagent could not find XHR'
              )
            })
          var d = ''.trim
            ? function (t) {
                return t.trim()
              }
            : function (t) {
                return t.replace(/(^\s*|\s*$)/g, '')
              }
          function y(t) {
            if (!c(t)) return t
            var e,
              r = []
            for (e in t)
              Object.prototype.hasOwnProperty.call(t, e) &&
                !(function e(r, n, t) {
                  if (void 0 === t) return
                  if (null === t) return void r.push(encodeURI(n))
                  if (Array.isArray(t))
                    t.forEach(function (t) {
                      e(r, n, t)
                    })
                  else if (c(t))
                    for (var o in t)
                      Object.prototype.hasOwnProperty.call(t, o) &&
                        e(r, ''.concat(n, '[').concat(o, ']'), t[o])
                  else r.push(encodeURI(n) + '=' + encodeURIComponent(t))
                })(r, e, t[e])
            return r.join('&')
          }
          function m(t) {
            for (
              var e, r, n = {}, o = t.split('&'), i = 0, s = o.length;
              i < s;
              ++i
            )
              -1 === (r = (e = o[i]).indexOf('='))
                ? (n[decodeURIComponent(e)] = '')
                : (n[decodeURIComponent(e.slice(0, r))] = decodeURIComponent(
                    e.slice(r + 1)
                  ))
            return n
          }
          function g(t) {
            return /[/+]json($|[^-\w])/i.test(t)
          }
          function b(t) {
            ;(this.req = t),
              (this.xhr = this.req.xhr),
              (this.text =
                ('HEAD' !== this.req.method &&
                  ('' === this.xhr.responseType ||
                    'text' === this.xhr.responseType)) ||
                void 0 === this.xhr.responseType
                  ? this.xhr.responseText
                  : null),
              (this.statusText = this.req.xhr.statusText)
            var e = this.xhr.status
            1223 === e && (e = 204),
              this._setStatusProperties(e),
              (this.headers = (function (t) {
                for (
                  var e,
                    r,
                    n,
                    o = t.split(/\r?\n/),
                    i = {},
                    s = 0,
                    a = o.length;
                  s < a;
                  ++s
                )
                  -1 !== (n = (e = o[s]).indexOf(':')) &&
                    ((r = e.slice(0, n).toLowerCase()),
                    (n = d(e.slice(n + 1))),
                    (i[r] = n))
                return i
              })(this.xhr.getAllResponseHeaders())),
              (this.header = this.headers),
              (this.header['content-type'] =
                this.xhr.getResponseHeader('content-type')),
              this._setHeaderProperties(this.header),
              null === this.text && t._responseType
                ? (this.body = this.xhr.response)
                : (this.body =
                    'HEAD' === this.req.method
                      ? null
                      : this._parseBody(this.text || this.xhr.response))
          }
          function v(t, e) {
            var n = this
            ;(this._query = this._query || []),
              (this.method = t),
              (this.url = e),
              (this.header = {}),
              (this._header = {}),
              this.on('end', function () {
                var e,
                  r = null,
                  t = null
                try {
                  t = new b(n)
                } catch (t) {
                  return (
                    ((r = new Error(
                      'Parser is unable to parse the response'
                    )).parse = !0),
                    (r.original = t),
                    n.xhr
                      ? ((r.rawResponse =
                          void 0 === n.xhr.responseType
                            ? n.xhr.responseText
                            : n.xhr.response),
                        (r.status = n.xhr.status || null),
                        (r.statusCode = r.status))
                      : ((r.rawResponse = null), (r.status = null)),
                    n.callback(r)
                  )
                }
                n.emit('response', t)
                try {
                  n._isResponseOK(t) ||
                    (e = new Error(
                      t.statusText || t.text || 'Unsuccessful HTTP response'
                    ))
                } catch (t) {
                  e = t
                }
                e
                  ? ((e.original = r),
                    (e.response = t),
                    (e.status = t.status),
                    n.callback(e, t))
                  : n.callback(null, t)
              })
          }
          function T(t, e, r) {
            t = h('DELETE', t)
            return (
              'function' == typeof e && ((r = e), (e = null)),
              e && t.send(e),
              r && t.end(r),
              t
            )
          }
          ;(h.serializeObject = y),
            (h.parseString = m),
            (h.types = {
              'html': 'text/html',
              'json': 'application/json',
              'xml': 'text/xml',
              'urlencoded': 'application/x-www-form-urlencoded',
              'form': 'application/x-www-form-urlencoded',
              'form-data': 'application/x-www-form-urlencoded',
            }),
            (h.serialize = {
              'application/x-www-form-urlencoded': a.stringify,
              'application/json': s,
            }),
            (h.parse = {
              'application/x-www-form-urlencoded': m,
              'application/json': JSON.parse,
            }),
            l(b.prototype),
            (b.prototype._parseBody = function (t) {
              var e = h.parse[this.type]
              return this.req._parser
                ? this.req._parser(this, t)
                : (e = !e && g(this.type) ? h.parse['application/json'] : e) &&
                  t &&
                  (0 < t.length || t instanceof Object)
                ? e(t)
                : null
            }),
            (b.prototype.toError = function () {
              var t = this.req,
                e = t.method,
                r = t.url,
                t = 'cannot '
                  .concat(e, ' ')
                  .concat(r, ' (')
                  .concat(this.status, ')'),
                t = new Error(t)
              return (t.status = this.status), (t.method = e), (t.url = r), t
            }),
            (h.Response = b),
            i(v.prototype),
            u(v.prototype),
            (v.prototype.type = function (t) {
              return this.set('Content-Type', h.types[t] || t), this
            }),
            (v.prototype.accept = function (t) {
              return this.set('Accept', h.types[t] || t), this
            }),
            (v.prototype.auth = function (t, e, r) {
              'object' === n((e = 1 === arguments.length ? '' : e)) &&
                null !== e &&
                ((r = e), (e = '')),
                (r = r || {
                  type: 'function' == typeof btoa ? 'basic' : 'auto',
                })
              return this._auth(t, e, r, function (t) {
                if ('function' == typeof btoa) return btoa(t)
                throw new Error('Cannot use basic auth, btoa is not a function')
              })
            }),
            (v.prototype.query = function (t) {
              return (
                (t = 'string' != typeof t ? y(t) : t) && this._query.push(t),
                this
              )
            }),
            (v.prototype.attach = function (t, e, r) {
              if (e) {
                if (this._data)
                  throw new Error("superagent can't mix .send() and .attach()")
                this._getFormData().append(t, e, r || e.name)
              }
              return this
            }),
            (v.prototype._getFormData = function () {
              return (
                this._formData || (this._formData = new o.FormData()),
                this._formData
              )
            }),
            (v.prototype.callback = function (t, e) {
              if (this._shouldRetry(t, e)) return this._retry()
              var r = this._callback
              this.clearTimeout(),
                t &&
                  (this._maxRetries && (t.retries = this._retries - 1),
                  this.emit('error', t)),
                r(t, e)
            }),
            (v.prototype.crossDomainError = function () {
              var t = new Error(
                'Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.'
              )
              ;(t.crossDomain = !0),
                (t.status = this.status),
                (t.method = this.method),
                (t.url = this.url),
                this.callback(t)
            }),
            (v.prototype.buffer =
              v.prototype.ca =
              v.prototype.agent =
                function () {
                  return (
                    console.warn(
                      'This is not supported in browser version of superagent'
                    ),
                    this
                  )
                }),
            (v.prototype.pipe = v.prototype.write =
              function () {
                throw new Error(
                  'Streaming is not supported in browser version of superagent'
                )
              }),
            (v.prototype._isHost = function (t) {
              return (
                t &&
                'object' === n(t) &&
                !Array.isArray(t) &&
                '[object Object]' !== Object.prototype.toString.call(t)
              )
            }),
            (v.prototype.end = function (t) {
              this._endCalled &&
                console.warn(
                  'Warning: .end() was called twice. This is not supported in superagent'
                ),
                (this._endCalled = !0),
                (this._callback = t || f),
                this._finalizeQueryString(),
                this._end()
            }),
            (v.prototype._setUploadTimeout = function () {
              var t = this
              this._uploadTimeout &&
                !this._uploadTimeoutTimer &&
                (this._uploadTimeoutTimer = setTimeout(function () {
                  t._timeoutError(
                    'Upload timeout of ',
                    t._uploadTimeout,
                    'ETIMEDOUT'
                  )
                }, this._uploadTimeout))
            }),
            (v.prototype._end = function () {
              if (this._aborted)
                return this.callback(
                  new Error(
                    'The request has been aborted even before .end() was called'
                  )
                )
              var r = this
              this.xhr = h.getXHR()
              var n = this.xhr,
                t = this._formData || this._data
              this._setTimeouts(),
                (n.onreadystatechange = function () {
                  var e,
                    t = n.readyState
                  if (
                    (2 <= t &&
                      r._responseTimeoutTimer &&
                      clearTimeout(r._responseTimeoutTimer),
                    4 === t)
                  ) {
                    try {
                      e = n.status
                    } catch (t) {
                      e = 0
                    }
                    if (!e)
                      return r.timedout || r._aborted
                        ? void 0
                        : r.crossDomainError()
                    r.emit('end')
                  }
                })
              function e(t, e) {
                0 < e.total &&
                  ((e.percent = (e.loaded / e.total) * 100),
                  100 === e.percent && clearTimeout(r._uploadTimeoutTimer)),
                  (e.direction = t),
                  r.emit('progress', e)
              }
              var o, i, s
              if (this.hasListeners('progress'))
                try {
                  n.addEventListener('progress', e.bind(null, 'download')),
                    n.upload &&
                      n.upload.addEventListener(
                        'progress',
                        e.bind(null, 'upload')
                      )
                } catch (t) {}
              n.upload && this._setUploadTimeout()
              try {
                this.username && this.password
                  ? n.open(
                      this.method,
                      this.url,
                      !0,
                      this.username,
                      this.password
                    )
                  : n.open(this.method, this.url, !0)
              } catch (t) {
                return this.callback(t)
              }
              for (s in (this._withCredentials && (n.withCredentials = !0),
              this._formData ||
                'GET' === this.method ||
                'HEAD' === this.method ||
                'string' == typeof t ||
                this._isHost(t) ||
                ((o = this._header['content-type']),
                (i =
                  !(i =
                    this._serializer ||
                    h.serialize[o ? o.split(';')[0] : '']) && g(o)
                    ? h.serialize['application/json']
                    : i) && (t = i(t))),
              this.header))
                null !== this.header[s] &&
                  Object.prototype.hasOwnProperty.call(this.header, s) &&
                  n.setRequestHeader(s, this.header[s])
              this._responseType && (n.responseType = this._responseType),
                this.emit('request', this),
                n.send(void 0 === t ? null : t)
            }),
            (h.agent = function () {
              return new p()
            }),
            ['GET', 'POST', 'OPTIONS', 'PATCH', 'PUT', 'DELETE'].forEach(
              function (r) {
                p.prototype[r.toLowerCase()] = function (t, e) {
                  t = new h.Request(r, t)
                  return this._setDefaults(t), e && t.end(e), t
                }
              }
            ),
            (p.prototype.del = p.prototype.delete),
            (h.get = function (t, e, r) {
              t = h('GET', t)
              return (
                'function' == typeof e && ((r = e), (e = null)),
                e && t.query(e),
                r && t.end(r),
                t
              )
            }),
            (h.head = function (t, e, r) {
              t = h('HEAD', t)
              return (
                'function' == typeof e && ((r = e), (e = null)),
                e && t.query(e),
                r && t.end(r),
                t
              )
            }),
            (h.options = function (t, e, r) {
              t = h('OPTIONS', t)
              return (
                'function' == typeof e && ((r = e), (e = null)),
                e && t.send(e),
                r && t.end(r),
                t
              )
            }),
            (h.del = T),
            (h.delete = T),
            (h.patch = function (t, e, r) {
              t = h('PATCH', t)
              return (
                'function' == typeof e && ((r = e), (e = null)),
                e && t.send(e),
                r && t.end(r),
                t
              )
            }),
            (h.post = function (t, e, r) {
              t = h('POST', t)
              return (
                'function' == typeof e && ((r = e), (e = null)),
                e && t.send(e),
                r && t.end(r),
                t
              )
            }),
            (h.put = function (t, e, r) {
              t = h('PUT', t)
              return (
                'function' == typeof e && ((r = e), (e = null)),
                e && t.send(e),
                r && t.end(r),
                t
              )
            })
        },
        {
          './agent-base': 8,
          './is-object': 9,
          './request-base': 11,
          './response-base': 12,
          'component-emitter': 1,
          'fast-safe-stringify': 2,
          'qs': 4,
        },
      ],
      11: [
        function (t, e, r) {
          'use strict'
          function n(t) {
            return (n =
              'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (t) {
                    return typeof t
                  }
                : function (t) {
                    return t &&
                      'function' == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? 'symbol'
                      : typeof t
                  })(t)
          }
          var o = t('./is-object')
          function i(t) {
            if (t)
              return (function (t) {
                for (var e in i.prototype)
                  Object.prototype.hasOwnProperty.call(i.prototype, e) &&
                    (t[e] = i.prototype[e])
                return t
              })(t)
          }
          ;((e.exports = i).prototype.clearTimeout = function () {
            return (
              clearTimeout(this._timer),
              clearTimeout(this._responseTimeoutTimer),
              clearTimeout(this._uploadTimeoutTimer),
              delete this._timer,
              delete this._responseTimeoutTimer,
              delete this._uploadTimeoutTimer,
              this
            )
          }),
            (i.prototype.parse = function (t) {
              return (this._parser = t), this
            }),
            (i.prototype.responseType = function (t) {
              return (this._responseType = t), this
            }),
            (i.prototype.serialize = function (t) {
              return (this._serializer = t), this
            }),
            (i.prototype.timeout = function (t) {
              if (!t || 'object' !== n(t))
                return (
                  (this._timeout = t),
                  (this._responseTimeout = 0),
                  (this._uploadTimeout = 0),
                  this
                )
              for (var e in t)
                if (Object.prototype.hasOwnProperty.call(t, e))
                  switch (e) {
                    case 'deadline':
                      this._timeout = t.deadline
                      break
                    case 'response':
                      this._responseTimeout = t.response
                      break
                    case 'upload':
                      this._uploadTimeout = t.upload
                      break
                    default:
                      console.warn('Unknown timeout option', e)
                  }
              return this
            }),
            (i.prototype.retry = function (t, e) {
              return (
                (t = 0 === arguments.length || !0 === t ? 1 : t) <= 0 &&
                  (t = 0),
                (this._maxRetries = t),
                (this._retries = 0),
                (this._retryCallback = e),
                this
              )
            })
          var s = new Set([
              'ETIMEDOUT',
              'ECONNRESET',
              'EADDRINUSE',
              'ECONNREFUSED',
              'EPIPE',
              'ENOTFOUND',
              'ENETUNREACH',
              'EAI_AGAIN',
            ]),
            a = new Set([408, 413, 429, 500, 502, 503, 504, 521, 522, 524])
          ;(i.prototype._shouldRetry = function (t, e) {
            if (!this._maxRetries || this._retries++ >= this._maxRetries)
              return !1
            if (this._retryCallback)
              try {
                var r = this._retryCallback(t, e)
                if (!0 === r) return !0
                if (!1 === r) return !1
              } catch (t) {
                console.error(t)
              }
            if (e && e.status && a.has(e.status)) return !0
            if (t) {
              if (t.code && s.has(t.code)) return !0
              if (t.timeout && 'ECONNABORTED' === t.code) return !0
              if (t.crossDomain) return !0
            }
            return !1
          }),
            (i.prototype._retry = function () {
              return (
                this.clearTimeout(),
                this.req && ((this.req = null), (this.req = this.request())),
                (this._aborted = !1),
                (this.timedout = !1),
                (this.timedoutError = null),
                this._end()
              )
            }),
            (i.prototype.then = function (t, e) {
              var o,
                i = this
              return (
                this._fullfilledPromise ||
                  ((o = this)._endCalled &&
                    console.warn(
                      'Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises'
                    ),
                  (this._fullfilledPromise = new Promise(function (r, n) {
                    o.on('abort', function () {
                      var t
                      ;(i._maxRetries && i._maxRetries > i._retries) ||
                        (i.timedout && i.timedoutError
                          ? n(i.timedoutError)
                          : (((t = new Error('Aborted')).code = 'ABORTED'),
                            (t.status = i.status),
                            (t.method = i.method),
                            (t.url = i.url),
                            n(t)))
                    }),
                      o.end(function (t, e) {
                        t ? n(t) : r(e)
                      })
                  }))),
                this._fullfilledPromise.then(t, e)
              )
            }),
            (i.prototype.catch = function (t) {
              return this.then(void 0, t)
            }),
            (i.prototype.use = function (t) {
              return t(this), this
            }),
            (i.prototype.ok = function (t) {
              if ('function' != typeof t) throw new Error('Callback required')
              return (this._okCallback = t), this
            }),
            (i.prototype._isResponseOK = function (t) {
              return (
                !!t &&
                (this._okCallback
                  ? this._okCallback(t)
                  : 200 <= t.status && t.status < 300)
              )
            }),
            (i.prototype.getHeader = i.prototype.get =
              function (t) {
                return this._header[t.toLowerCase()]
              }),
            (i.prototype.set = function (t, e) {
              if (o(t)) {
                for (var r in t)
                  Object.prototype.hasOwnProperty.call(t, r) &&
                    this.set(r, t[r])
                return this
              }
              return (
                (this._header[t.toLowerCase()] = e), (this.header[t] = e), this
              )
            }),
            (i.prototype.unset = function (t) {
              return (
                delete this._header[t.toLowerCase()],
                delete this.header[t],
                this
              )
            }),
            (i.prototype.field = function (t, e) {
              if (null == t)
                throw new Error('.field(name, val) name can not be empty')
              if (this._data)
                throw new Error(
                  ".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()"
                )
              if (o(t)) {
                for (var r in t)
                  Object.prototype.hasOwnProperty.call(t, r) &&
                    this.field(r, t[r])
                return this
              }
              if (Array.isArray(e)) {
                for (var n in e)
                  Object.prototype.hasOwnProperty.call(e, n) &&
                    this.field(t, e[n])
                return this
              }
              if (null == e)
                throw new Error('.field(name, val) val can not be empty')
              return (
                'boolean' == typeof e && (e = String(e)),
                this._getFormData().append(t, e),
                this
              )
            }),
            (i.prototype.abort = function () {
              return (
                this._aborted ||
                  ((this._aborted = !0),
                  this.xhr && this.xhr.abort(),
                  this.req && this.req.abort(),
                  this.clearTimeout(),
                  this.emit('abort')),
                this
              )
            }),
            (i.prototype._auth = function (t, e, r, n) {
              switch (r.type) {
                case 'basic':
                  this.set(
                    'Authorization',
                    'Basic '.concat(n(''.concat(t, ':').concat(e)))
                  )
                  break
                case 'auto':
                  ;(this.username = t), (this.password = e)
                  break
                case 'bearer':
                  this.set('Authorization', 'Bearer '.concat(t))
              }
              return this
            }),
            (i.prototype.withCredentials = function (t) {
              return void 0 === t && (t = !0), (this._withCredentials = t), this
            }),
            (i.prototype.redirects = function (t) {
              return (this._maxRedirects = t), this
            }),
            (i.prototype.maxResponseSize = function (t) {
              if ('number' != typeof t) throw new TypeError('Invalid argument')
              return (this._maxResponseSize = t), this
            }),
            (i.prototype.toJSON = function () {
              return {
                method: this.method,
                url: this.url,
                data: this._data,
                headers: this._header,
              }
            }),
            (i.prototype.send = function (t) {
              var e = o(t),
                r = this._header['content-type']
              if (this._formData)
                throw new Error(
                  ".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()"
                )
              if (e && !this._data)
                Array.isArray(t)
                  ? (this._data = [])
                  : this._isHost(t) || (this._data = {})
              else if (t && this._data && this._isHost(this._data))
                throw new Error("Can't merge these send calls")
              if (e && o(this._data))
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) &&
                    (this._data[n] = t[n])
              else
                'string' == typeof t
                  ? (r || this.type('form'),
                    (r =
                      (r = this._header['content-type']) &&
                      r.toLowerCase().trim()),
                    (this._data =
                      'application/x-www-form-urlencoded' === r
                        ? this._data
                          ? ''.concat(this._data, '&').concat(t)
                          : t
                        : (this._data || '') + t))
                  : (this._data = t)
              return !e || this._isHost(t) || r || this.type('json'), this
            }),
            (i.prototype.sortQuery = function (t) {
              return (this._sort = void 0 === t || t), this
            }),
            (i.prototype._finalizeQueryString = function () {
              var t,
                e = this._query.join('&')
              e && (this.url += (this.url.includes('?') ? '&' : '?') + e),
                (this._query.length = 0),
                !this._sort ||
                  (0 <= (t = this.url.indexOf('?')) &&
                    ((e = this.url.slice(t + 1).split('&')),
                    'function' == typeof this._sort
                      ? e.sort(this._sort)
                      : e.sort(),
                    (this.url = this.url.slice(0, t) + '?' + e.join('&'))))
            }),
            (i.prototype._appendQueryString = function () {
              console.warn('Unsupported')
            }),
            (i.prototype._timeoutError = function (t, e, r) {
              this._aborted ||
                (((t = new Error(''.concat(t + e, 'ms exceeded'))).timeout = e),
                (t.code = 'ECONNABORTED'),
                (t.errno = r),
                (this.timedout = !0),
                (this.timedoutError = t),
                this.abort(),
                this.callback(t))
            }),
            (i.prototype._setTimeouts = function () {
              var t = this
              this._timeout &&
                !this._timer &&
                (this._timer = setTimeout(function () {
                  t._timeoutError('Timeout of ', t._timeout, 'ETIME')
                }, this._timeout)),
                this._responseTimeout &&
                  !this._responseTimeoutTimer &&
                  (this._responseTimeoutTimer = setTimeout(function () {
                    t._timeoutError(
                      'Response timeout of ',
                      t._responseTimeout,
                      'ETIMEDOUT'
                    )
                  }, this._responseTimeout))
            })
        },
        { './is-object': 9 },
      ],
      12: [
        function (t, e, r) {
          'use strict'
          var o = t('./utils')
          function n(t) {
            if (t)
              return (function (t) {
                for (var e in n.prototype)
                  Object.prototype.hasOwnProperty.call(n.prototype, e) &&
                    (t[e] = n.prototype[e])
                return t
              })(t)
          }
          ;((e.exports = n).prototype.get = function (t) {
            return this.header[t.toLowerCase()]
          }),
            (n.prototype._setHeaderProperties = function (t) {
              var e = t['content-type'] || ''
              this.type = o.type(e)
              var r,
                n = o.params(e)
              for (r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (this[r] = n[r])
              this.links = {}
              try {
                t.link && (this.links = o.parseLinks(t.link))
              } catch (t) {}
            }),
            (n.prototype._setStatusProperties = function (t) {
              var e = (t / 100) | 0
              ;(this.statusCode = t),
                (this.status = this.statusCode),
                (this.statusType = e),
                (this.info = 1 == e),
                (this.ok = 2 == e),
                (this.redirect = 3 == e),
                (this.clientError = 4 == e),
                (this.serverError = 5 == e),
                (this.error = (4 == e || 5 == e) && this.toError()),
                (this.created = 201 === t),
                (this.accepted = 202 === t),
                (this.noContent = 204 === t),
                (this.badRequest = 400 === t),
                (this.unauthorized = 401 === t),
                (this.notAcceptable = 406 === t),
                (this.forbidden = 403 === t),
                (this.notFound = 404 === t),
                (this.unprocessableEntity = 422 === t)
            })
        },
        { './utils': 13 },
      ],
      13: [
        function (t, e, r) {
          'use strict'
          function i(t, e) {
            var r
            if ('undefined' == typeof Symbol || null == t[Symbol.iterator]) {
              if (
                Array.isArray(t) ||
                (r = (function (t, e) {
                  if (!t) return
                  if ('string' == typeof t) return a(t, e)
                  var r = Object.prototype.toString.call(t).slice(8, -1)
                  'Object' === r && t.constructor && (r = t.constructor.name)
                  if ('Map' === r || 'Set' === r) return Array.from(t)
                  if (
                    'Arguments' === r ||
                    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                  )
                    return a(t, e)
                })(t)) ||
                (e && t && 'number' == typeof t.length)
              ) {
                r && (t = r)
                var n = 0,
                  e = function () {}
                return {
                  s: e,
                  n: function () {
                    return n >= t.length
                      ? { done: !0 }
                      : { done: !1, value: t[n++] }
                  },
                  e: function (t) {
                    throw t
                  },
                  f: e,
                }
              }
              throw new TypeError(
                'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
              )
            }
            var o,
              i = !0,
              s = !1
            return {
              s: function () {
                r = t[Symbol.iterator]()
              },
              n: function () {
                var t = r.next()
                return (i = t.done), t
              },
              e: function (t) {
                ;(s = !0), (o = t)
              },
              f: function () {
                try {
                  i || null == r.return || r.return()
                } finally {
                  if (s) throw o
                }
              },
            }
          }
          function a(t, e) {
            ;(null == e || e > t.length) && (e = t.length)
            for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r]
            return n
          }
          ;(r.type = function (t) {
            return t.split(/ *; */).shift()
          }),
            (r.params = function (t) {
              var e = {},
                r = i(t.split(/ *; */))
              try {
                for (r.s(); !(o = r.n()).done; ) {
                  var n = o.value.split(/ *= */),
                    o = n.shift(),
                    n = n.shift()
                  o && n && (e[o] = n)
                }
              } catch (t) {
                r.e(t)
              } finally {
                r.f()
              }
              return e
            }),
            (r.parseLinks = function (t) {
              var e = {},
                r = i(t.split(/ *, */))
              try {
                for (r.s(); !(o = r.n()).done; ) {
                  var n = o.value.split(/ *; */),
                    o = n[0].slice(1, -1)
                  e[n[1].split(/ *= */)[1].slice(1, -1)] = o
                }
              } catch (t) {
                r.e(t)
              } finally {
                r.f()
              }
              return e
            }),
            (r.cleanHeader = function (t, e) {
              return (
                delete t['content-type'],
                delete t['content-length'],
                delete t['transfer-encoding'],
                delete t.host,
                e && (delete t.authorization, delete t.cookie),
                t
              )
            })
        },
        {},
      ],
    },
    {},
    [10]
  )(10)
})

function initMFS() {
  var j = 'https://test.masterpassturkiye.com/MasterpassJsonServerHandler/v2',
    L = '',
    F = new RSAKey()
  F.setPublic(
    'F619C53A37BAB059C583DA9AC4E2920FFC9D57E00885E82F7A0863DEAC43CE06374E45A1417DAC907C6CAC0AF1DDF1D7152192FED7A1D9255C97BC27E420E0742B95ED3C53C62995F42CB6EEDB7B1FBDD3E4F4A4AA935650DA81E763CA7074690032F6A6AF72802CC50394C2AFA5C9450A990E6F969A38571C8BC9E381125D2BEEC348AF919D7374FF10DC3E0B4367566CE929AD6EA323A475A677EB41C20B42D44E82E8A53DD52334D927394FCADF09',
    '03'
  ),
    (SDK = (function () {
      function o(t, e, r) {
        for (var n = r.length - 1; 0 <= n; n--) {
          var o = r[n]
          e[o] = (function (t, e) {
            var tValue = t[e]

            for (var r = Object.keys(t), n = r.length - 1; 0 <= n; n--) {
              if (r[n] == e) {
                if (
                  'cardAliasName' == e ||
                  'accountAliasName' == e ||
                  'cardHolderName' == e ||
                  'listAccountName' == e ||
                  'productId' == e ||
                  'senderAliasName' == e ||
                  'recipientAliasName' == e
                )
                  return encodeURIComponent(tValue)
                if ('validationCode' == e) {
                  if (I) return F.encrypt(tValue)
                  if (N) {
                    var i = tValue.replace('.', '').replace(',', '')
                    return 3 == i.length ? i : i.concat('0')
                  }
                }
                if ('rtaPan' == e || 'pan' == e)
                  return P(tValue) ? F.encrypt(tValue) : ''
                if ('cvv' == e || 'cvc' == e)
                  return 3 != tValue.length && 4 != tValue.length
                    ? ''
                    : F.encrypt(tValue)
                if ('installmentCount' == e && '' !== tValue && !isNaN(tValue))
                  return parseFloat(tValue)
                if (typeof tValue === 'boolean' && !tValue) continue
                return tValue
              }
            }
            return null
          })(t, o)
        }
        ;(e.fp = L), (e.additionalParams = u)
      }
      function i(t, e, n) {
        t.clientId = s
        var r = (r = new Date().toJSON()).replace(/"/g, '')
        ;(t.dateTime = r),
          (t.version = '36.2'),
          (t.clientType = '1'),
          axios
            .post(j + e, t)
            .then(response => response.data)
            .then(function (e) {
              var r = (function (t) {
                var r = {}
                if (e.hasOwnProperty('Data')) {
                  ;(r.referenceNo =
                    e.Data.Body.Fault.Detail.ServiceFaultDetail.RefNo),
                    (r.responseCode =
                      e.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode),
                    (r.responseDescription =
                      e.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseDesc),
                    (r.url3D =
                      e.Data.Body.Fault.Detail.ServiceFaultDetail.Url3D),
                    (r.url3DSuccess =
                      e.Data.Body.Fault.Detail.ServiceFaultDetail.Url3DSuccess),
                    (r.url3DError =
                      e.Data.Body.Fault.Detail.ServiceFaultDetail.Url3DError),
                    (r.urlLoan =
                      e.Data.Body.Fault.Detail.ServiceFaultDetail.UrlLoan),
                    (r.urlLoanSuccess =
                      e.Data.Body.Fault.Detail.ServiceFaultDetail.UrlLoanSuccess),
                    (r.urlLoanError =
                      e.Data.Body.Fault.Detail.ServiceFaultDetail.UrlLoanError),
                    (r.newMsisdn =
                      e.Data.Body.Fault.Detail.ServiceFaultDetail.NewMsisdn),
                    (r.internalResponseCode =
                      e.Data.Body.Fault.Detail.ServiceFaultDetail.InternalResponseCode),
                    (r.internalResponseDescription =
                      e.Data.Body.Fault.Detail.ServiceFaultDetail.InternalResponseMessage)
                  var n = e.Data.Body.Fault.Detail.ServiceFaultDetail.Token,
                    o = ''
                  if (e.Data.Body.hasOwnProperty('Response')) {
                    ;(o = e.Data.Body.Response.Result.TransactionBody.Token),
                      (r.token = o)
                    t = ''
                    e.Data.Body.Response.Result.TransactionBody.hasOwnProperty(
                      'RefNo'
                    ) &&
                      '' !==
                        e.Data.Body.Response.Result.TransactionBody.RefNo &&
                      (t = e.Data.Body.Response.Result.TransactionBody.RefNo),
                      e.Data.Body.Fault.Detail.ServiceFaultDetail.hasOwnProperty(
                        'RefNo'
                      ) &&
                        '' !==
                          e.Data.Body.Fault.Detail.ServiceFaultDetail.RefNo &&
                        (t = e.Data.Body.Fault.Detail.ServiceFaultDetail.RefNo),
                      (r.transactionId = t)
                    t = ''
                    e.Data.Body.Response.Result.TransactionBody.hasOwnProperty(
                      'CardUniqueId'
                    ) &&
                      '' !==
                        e.Data.Body.Response.Result.TransactionBody
                          .CardUniqueId &&
                      (t =
                        e.Data.Body.Response.Result.TransactionBody
                          .CardUniqueId),
                      (r.cardUniqueId = t),
                      e.Data.Body.Response.Result.TransactionBody.hasOwnProperty(
                        'AccountList'
                      ) &&
                        '' !==
                          e.Data.Body.Response.Result.TransactionBody
                            .AccountList &&
                        (r.AccountList =
                          e.Data.Body.Response.Result.TransactionBody.AccountList)
                    var i =
                      e.Data.Body.Response.Result.TransactionBody.ListItems
                    try {
                      i && 0 !== i.ListItem && (r.cards = i.ListItem)
                    } catch (t) {}
                    try {
                      i && 0 !== i.BankList && (r.banks = i.BankList)
                    } catch (t) {}
                    ;(r.accountStatus =
                      e.Data.Body.Response.Result.TransactionBody.AccountStatus),
                      (r.amount =
                        e.Data.Body.Response.Result.TransactionBody.Amount),
                      (r.orderNo =
                        e.Data.Body.Response.Result.TransactionBody.OrderNo),
                      (r.installmentCount =
                        e.Data.Body.Response.Result.TransactionBody.InstallmentCount)
                  }
                  n && 0 !== n.length ? (a = n) : (r.token = o)
                }
                return r
              })(e)
              n(200, r)
            })
            .catch(error => n(500, error))
      }
      var s,
        a,
        u,
        c,
        n = [
          'actionType',
          'clientIp',
          'delinkReason',
          'eActionType',
          'cardTypeFlag',
          'cpinFlag',
          'defaultAccount',
          'mmrpConfig',
          'identityVerificationFlag',
          'mobileAccountConfig',
          'msisdn',
          'referenceNo',
          'sendSms',
          'sendSmsLanguage',
          'timeZone',
          'uiChannelType',
          'rtaPan',
          'expiryDate',
          'accountAliasName',
          'cvc',
          'homeAddress',
          'homeCity',
          'homeState',
          'homeCountryCode',
          'homePostalCode',
          'firstName',
          'lastName',
          'email',
          'cardHolderName',
          'token',
        ],
        l = [
          'msisdn',
          'referenceNo',
          'sendSms',
          'sendSmsLanguage',
          'accountAliasName',
          'token',
        ],
        p = [
          'validationCode',
          'sendSms',
          'sendSmsLanguage',
          'referenceNo',
          'token',
        ],
        f = [
          'aav',
          'amount',
          'clientIp',
          'encCPin',
          'encPassword',
          'listAccountName',
          'msisdn',
          'password',
          'referenceNo',
          'sendSms',
          'sendSmsLanguage',
          'sendSmsMerchant',
          'userId',
          'token',
          'rewardName',
          'rewardValue',
          'moneyCardInvoiceAmount',
          'moneyCardMigrosDiscountAmount',
          'moneyCardPaymentAmount',
          'moneyCardExtraDiscountAmount',
          'moneyCardProductBasedDiscountAmount',
          'installmentCount',
          'cvc',
          'macroMerchantId',
          'orderNo',
          'paymentType',
        ],
        h = [
          'msisdn',
          'encPan',
          'token',
          'referenceNo',
          'sendSms',
          'sendSmsLanguage',
          'cvv',
        ],
        d = ['userId', 'token', 'referenceNo', 'sendSms', 'sendSmsLanguage'],
        y = [
          'msisdn',
          'cardAliasName',
          'token',
          'referenceNo',
          'sendSms',
          'sendSmsLanguage',
        ],
        m = [
          'msisdn',
          'cardAliasName',
          'token',
          'referenceNo',
          'sendSms',
          'sendSmsLanguage',
        ],
        g = [
          'token',
          'msisdn',
          'sendSmsLanguage',
          'fP',
          'amount',
          'expiryDate',
          'rtaPan',
          'cardHolderName',
          'cvc',
          'macroMerchantId',
          'orderNo',
          'paymentType',
          'installmentCount',
          'rewardName',
          'rewardValue',
        ],
        b = [
          'sendSmsLanguage',
          'msisdn',
          'token',
          'cardAliasName',
          'fP',
          'referenceNo',
          'sendSms',
        ],
        v = [
          'token',
          'msisdn',
          'oldValue',
          'theNewValue',
          'valueType',
          'sendSmsLanguage',
          'fP',
          'referenceNo',
          'sendSms',
        ],
        T = [
          'token',
          'msisdn',
          'sendSmsLanguage',
          'fP',
          'referenceNo',
          'sendSms',
        ],
        _ = [
          'msisdn',
          'accountAliasName',
          'token',
          'referenceNo',
          'sendSms',
          'sendSmsLanguage',
          'fP',
          'amount',
          'actionType',
          'firstName',
          'lastName',
          'gender',
          'expiryDate',
          'rtaPan',
          'cardHolderName',
          'orderNo',
          'merchantId',
          'rewardName',
          'rewardValue',
          'moneyCardInvoiceAmount',
          'moneyCardMigrosDiscountAmount',
          'moneyCardPaymentAmount',
          'moneyCardExtraDiscountAmount',
          'moneyCardProductBasedDiscountAmount',
          'installmentCount',
          'cvc',
          'macroMerchantId',
          'orderNo',
          'paymentType',
        ],
        S = ['msisdn', 'token', 'referenceNo', 'sendSms', 'sendSmsLanguage'],
        w = [
          'msisdn',
          'token',
          'listAccountName',
          'amount',
          'endDate',
          'actionType',
          'referenceNo',
          'sendSms',
          'sendSmsLanguage',
          'productId',
        ],
        D = [
          'aav',
          'amount',
          'clientIp',
          'encCPin',
          'encPassword',
          'moneySendType',
          'senderAliasName',
          'recipientAliasName',
          'msisdn',
          'password',
          'referenceNo',
          'sendSms',
          'sendSmsLanguage',
          'sendSmsMerchant',
          'userId',
          'token',
          'rewardName',
          'rewardValue',
          'moneyCardInvoiceAmount',
          'installmentCount',
          'cvc',
          'macroMerchantId',
          'orderNo',
          'paymentType',
        ],
        A = [
          'language',
          'referenceNo',
          'cvc',
          'pan',
          'client_token',
          'action_type',
          'token',
        ],
        C = ['msisdn', 'token', 'language', 'referenceNo'],
        R = [
          'referenceNo',
          'language',
          'msisdn',
          'amount',
          'client_token',
          'fP',
          'macroMerchantId',
          'orderNo',
          'basketInfo',
          'campaignCode',
          'loanBankIca',
          'bankIca',
        ],
        B = [
          'referenceNo',
          'language',
          'token',
          'fP',
          'identityNumber',
          'transactionType',
        ],
        E = [
          'referenceNo',
          'language',
          'token',
          'fP',
          'installmentId',
          'installmentCount',
          'loanType',
        ],
        O = ['referenceNo', 'language', 'token', 'fP', 'loanType', 'loanRrn'],
        I = !1,
        N = !1,
        P =
          ((c = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]),
          function (t) {
            for (var e, r = t.length, n = 1, o = 0; r; )
              (e = parseInt(t.charAt(--r), 10)), (o += (n ^= 1) ? c[e] : e)
            return o && o % 10 == 0
          })
      return {
        setClientId: function (t) {
          s = t
        },
        listCards: function (t, e, r) {
          var n = {}
          ;(n.msisdn = t),
            (n.token = e),
            (n.referenceNo = '00000000'),
            (n.listType = 'ACCOUNT'),
            (n.sendSms = 'Y'),
            (n.clientIp = ''),
            (n.sendSmsLanguage = 'eng'),
            i(n, '/listManagement', r)
        },
        register: function (t, e) {
          var r = {}
          o(t, r, n), i(r, '/register', e)
        },
        purchase: function (t, e) {
          var r = {}
          o(t, r, f), i(r, '/remotePurchaseOther', e)
        },
        commit: function (t) {
          var e = {
            referenceNo: '00000000',
            sendSms: 'N',
            sendSmsLanguage: 'eng',
          }
          ;(e.token = t), i(e, '/commitTransaction', function () {})
        },
        deleteCard: function (t, e) {
          var r = {}
          o(t, r, l), i(r, '/deleteCard', e)
        },
        validateTransaction: function (t, e) {
          var r = t['pinType']
          ;(I = 'mpin' == r || 'cvv' == r), 'rta' == r && (N = !0)
          r = {}
          ;(r.validationRefNo = a), o(t, r, p), i(r, '/validateTransaction', e)
        },
        forgotPassword: function (t, e) {
          var r = {}
          o(t, r, h), i(r, '/forgotPassword', e)
        },
        setAddress: function (t) {
          j = t
        },
        checkMasterPass: function (t, e) {
          var r = {}
          o(t, r, d), i(r, '/checkMasterPassEndUser', e)
        },
        linkCardToClient: function (t, e) {
          var r = {}
          o(t, r, m), i(r, '/linkCardToClient', e)
        },
        addCardToMasterPass: function (t, e) {
          var r = {}
          o(t, r, y), i(r, '/addCardToMasterPass', e)
        },
        purchaseAndRegister: function (t, e) {
          var r = {}
          ;(r.validationRefNo = a), o(t, r, _), i(r, '/purchaseAndRegister', e)
        },
        directPurchase: function (t, e) {
          var r = {}
          o(t, r, g), i(r, '/directPurchase', e)
        },
        resendOtp: function (t, e, r) {
          var n = {}
          ;(n.validationRefNo = t),
            (n.referenceNo = '00000000'),
            (n.sendSms = 'N'),
            (n.sendSmsLanguage = e),
            i(n, '/resendOtp', r)
        },
        completeRegistration: function (t, e, r) {
          var n = {}
          ;(n.token2 = e), o(t, n, b), i(n, '/completeRegistration', r)
        },
        setFingerprint: function (t) {
          L = t
        },
        setToken: function (t) {
          a = t
        },
        getLastToken: function () {
          return a
        },
        updateUser: function (t, e) {
          var r = {}
          o(t, r, v), i(r, '/updateUser', e)
        },
        verifyPin: function (t, e) {
          var r = {}
          o(t, r, T), i(r, '/verifyPin', e)
        },
        parseQrCode: function (t, e) {
          var r = {}
          o(t, r, S), i(r, '/QrPaymentVerify', e)
        },
        initiateRecurringPayment: function (t, e) {
          var r = {}
          o(t, r, w), i(r, '/initiateManageRecurringPayment', e)
        },
        setAdditionalParameters: function (t) {
          u = t
        },
        moneySend: function (t, e) {
          var r = {}
          o(t, r, D), i(r, '/initiateMoneySend', e)
        },
        getCardUniqueId: function (t, e, r) {
          var n = {}
          P(t) ? (n.rtaPan = F.encrypt(t)) : (n.rtaPan = ''),
            (n.token = e),
            (n.referenceNo = '00000000'),
            (n.sendSms = 'N'),
            (n.clientIp = ''),
            (n.sendSmsLanguage = 'eng'),
            i(n, '/getCardUniqueId', r)
        },
        listCardAccounts: function (t, e) {
          var r = {}
          o(t, r, A), i(r, '/ListAccountByCardOwner ', e)
        },
        deleteCardAccount: function (t, e) {
          var r = {}
          o(t, r, C), i(r, '/deletecardbycardowner', e)
        },
        getDigitalLoanUrl: function (t, e) {
          var r = {}
          o(t, r, R), i(r, '/digitalLoanUrl', e)
        },
        initiateTcknValidation: function (t, e) {
          var r = {}
          o(t, r, B), i(r, '/initiateTcknValidation', e)
        },
        completeLoan: function (t, e) {
          var r = {}
          o(t, r, E), i(r, '/completeLoan', e)
        },
        initiateLoanPayment: function (t, e) {
          var r = {}
          o(t, r, O), i(r, '/initiateLoanPayment', e)
        },
      }
    })())
}

initMFS(this)

export default SDK
