import subprocess
import sys
import time

def main():

    while True:
        time.sleep(30)

        # Reading cpu stats per container (from docker)
        stats_command = subprocess.run(['docker', 'stats', '--no-stream', 
        '--format', '"{{.Name}}: {{.CPUPerc}}"'], capture_output=True)
        stats = stats_command.stdout.decode("UTF-8").replace('"', '').replace('%', '').replace(':', '')

        # Proc usages per container
        # "container_name" -> [cpu_usage, replicas_num]
        usages = {}

        # Collecting containers' metrics
        for stat in stats[:-1].split("\n"):
            container, proc = stat.split(" ")
            proc = float(proc)

            # Skipping containers meant for monitoring
            if container == "grafana" or container == "prometheus" or\
                container == "cadvisor" or container == "redis" or container == "webapp":
                continue
            
            container_name = container[23:-2]

            # Adding usage
            if container_name not in usages:
                usages[container_name] = [0.0, 0]
            usages[container_name][0] += proc
            usages[container_name][1] += 1


        # Collecting replicas requirements
        scale_command_args = ['docker-compose', 'scale']
        for container in usages:
            if container == "":
                continue
            proc = usages[container][0]
            replicas = usages[container][1]

            if replicas > 1 and proc / replicas < 20.0:
                replicas -= 1
            elif proc / replicas > 70.0:
                replicas += 1

            scale_command_args.append(f"{container}={replicas}")

        # Scaling replicas
        subprocess.run(scale_command_args)

if __name__ == "__main__":
    main()