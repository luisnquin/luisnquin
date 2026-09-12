let
  publicKeys = {
    termius-faraday = "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIMNOYm8dmSXKjgaBQDWCnSvcsGyiJILX3Vwejmkm150+ faraday";
    nyx = "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIIXW6vsDRgI/AiOdGnQOTyiz1uLFL0o66u0Ahcw9VWyd luis@quinones.pro";
    rose = "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIEZKS1brwUIxDsIipGgEl/7yS9/hZS9sqOfhn0YIsBgl luis@quinones.pro";
    dazzle-faraday = "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOy0naPj/yYMQtfKt/geDwWyS16IujRV3UbC4P2xQalE";
    dazzle-emu = "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIJ3S+kasCN9Y1Eb9S3bOPaLMYx+yfQ/2b/DoPZUlJjav spectacle-emu";
  };

  authorizedByHost = {
    nyx = [
      "termius-faraday"
	  "dazzle-faraday"
      "rose"
    ];

    rose = [
      "nyx"
      "dazzle-faraday"
      "dazzle-emu"
    ];
  };

  hostKeys = {
    "github.com" = [
      "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOMqqnkVzrm0SdG6UOoqKLsabgH5C9okWi0dh2l9GKJl"
      "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCj7ndNxQowgcQnjshcLrqPEiiphnt+VTTvDP6mHBL9j1aNUkY4Ue1gvwnGLVlOhGeYrnZaMgRK6+PKCUXaDbC7qtbW8gIkhL7aGCsOr/C56SJMy/BCZfxd1nWzAOxSDPgVsmerOBYfNqltV9/hWCqBywINIR+5dIg6JTJ72pcEpEjcYgXkE2YEFXV1JHnsKgbLWNlhScqb2UmyRkQyytRLtL+38TGxkxCflmO+5Z8CSSNY7GidjMIZ7Q4zMjA2n1nGrlTDkzwDCsw+wqFPGQA179cnfGWOWRVruj16z6XyvxvjJwbz0wQZ75XK5tKSb7FNyeIEs4TT4jk+S4dhPeAUC5y+bDYirYgM4GC7uEnztnZyaVWQ7B381AK4Qdrwt51ZqExKbQpTUNn+EjqoTwvqNj4kqx5QUCI0ThS/YkOxJCXmPUWZbhjpCg56i+2aB6CmK2JGhn57K5mj0MNdBXA4/WnwH6XoPWJzK5Nyu2zB3nAZp+S5hpQs+p1vN1/wsjk="
    ];

    "git.encore.dev" = [
      "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIHnYnozNaCKhAsIL0vWc4NEW1XoPXS98pMFivH+PRzwr"
    ];
  };

  perHost = f:
    builtins.concatLists
    (builtins.attrValues (builtins.mapAttrs (host: builtins.map (f host)) hostKeys));
in {
  authorizedKeys = builtins.mapAttrs (_: builtins.map (name: publicKeys.${name})) authorizedByHost;

  nixosKnownHosts = builtins.listToAttrs (perHost (host: key: {
    name = "${host}-${key}";
    value = {
      hostNames = [host];
      publicKey = key;
    };
  }));

  knownHostsLines = perHost (host: key: "${host} ${key}");
}
