# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"
IMAGE_NAME = "generic/ubuntu1904"
N = 2

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
    config.vm.provider "virtualbox" do |v|
        v.gui = false
        v.memory = 2048
        v.cpus = 2
        v.customize [
            'modifyvm', :id,
            '--natdnshostresolver1', 'on',
            "--natdnsproxy1", "on",
            "--nictype1", "virtio"
        ]
    end
      
    config.vm.define "k8s-master" do |master|
        master.vm.box = IMAGE_NAME
        master.vm.network "forwarded_port", guest: 8080, host: 80
        master.vm.network "forwarded_port", guest: 8443, host: 443
        master.vm.network "private_network", ip: "192.168.50.10"
        master.vm.hostname = "k8s-master"
    end

    (1..N).each do |i|
        config.vm.define "k8s-node-#{i}" do |node|
            node.vm.box = IMAGE_NAME
            node.vm.network "forwarded_port", guest: 80, host: "#{i + 18080}"
            node.vm.network "forwarded_port", guest: 443, host: "#{i + 18443}"
            node.vm.network "private_network", ip: "192.168.50.#{i + 10}"
            node.vm.hostname = "k8s-node-#{i}"

            # Only execute once the Ansible provisioner,
            # when all the machines are up and ready.
            if i == N
                node.vm.provision :ansible do |ansible|
                    # Disable default limit to connect to all the machines
                    ansible.limit = "all"
                    ansible.playbook = "playbook/vagrant.yml"
                    ansible.groups = {
                        "k8smaster" => ["k8s-master"],
                        "k8snode" => ["k8s-node-[1:#{N}]"]
                    }
                end
            end
        end
    end
end