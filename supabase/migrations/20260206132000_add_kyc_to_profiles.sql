alter table public.profiles
  add column if not exists kyc_bvn text,
  add column if not exists kyc_nin text;
